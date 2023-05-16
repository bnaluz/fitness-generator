import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

interface ExerciseData {
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
    const currentUser = await getCurrentUser(); // Get the current user asynchronously

    if (!currentUser) {
      return res.status(401).json({ error: "User not authenticated" });
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
