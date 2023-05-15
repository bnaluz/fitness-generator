import { useEffect, useState } from "react";
import { SafeUser } from "@/types";
import Container from "@/utils/Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import { userAgent } from "next/server";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async (): Promise<void> => {
    try {
      const response = await fetch("/api/getCurrentUser");
      if (!response.ok) {
        setCurrentUser(null);
        return;
      }
      const user: SafeUser = await response.json();
      setCurrentUser(user);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  return (
    <div className="fixed bg-[#23237f] w-full z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div>signed in as {currentUser?.email}</div>
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
