import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";

export default async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession({ req });
    if (!session?.user?.email) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    });

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const formattedUser = {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    };

    return res.status(200).json(formattedUser);
  } catch (error: any) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
