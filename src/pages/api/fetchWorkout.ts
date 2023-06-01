import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const session = await getSession({ req });
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      const user = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const workouts = await prisma.workout.findMany({
        where: {
          userId: user.id,
        },
        include: {
          exercises: true,
        },
        orderBy: {
          date: "desc",
        },
      });

      res.status(200).json({ workouts });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      res.status(500).json({ error: "Failed to fetch workouts" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
