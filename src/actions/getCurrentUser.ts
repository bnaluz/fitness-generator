import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
}

const useCurrentUser = (): User | null => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async (): Promise<void> => {
    try {
      const session: Session | null = await getSession();
      if (!session?.user?.email) {
        setCurrentUser(null);
        return;
      }
      const response = await fetch("/api/getCurrentUser");
      if (!response.ok) {
        setCurrentUser(null);
        return;
      }
      const user: User = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  return currentUser;
};

export default useCurrentUser;
