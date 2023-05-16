import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

interface ExerciseData {
  exercises: [];
  name: string;
  repCount: number;
  weightCount: number;
  setCount: number;
}

export default async function createWorkout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession();
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
    // Extract the necessary data from the request body
    const { exercises } = req.body;

    // Create a new workout and associate it with the current user
    const createdWorkout = await prisma.workout.create({
      data: {
        userId: currentUser.id, // Assign the user ID
        date: new Date(),
        exercises: {
          create: exercises.map((exercise: ExerciseData) => ({
            ...exercise,
            user: { connect: { id: currentUser.id } }, // Connect the exercise to the user
          })),
        },
      },
    });

    res.status(201).json(createdWorkout);
  } catch (error) {
    console.error("Error saving workout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
