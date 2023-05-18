import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

interface ExerciseData {
  name: string;
  repCount: number;
  weightCount: number;
  setCount: number;
  userId: string;
}

export default async function saveWorkout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Check if the request body contains the exercises data
    if (
      !req.body ||
      !req.body.exercises ||
      !Array.isArray(req.body.exercises)
    ) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    const exercises: ExerciseData[] = req.body.exercises;

    const createdWorkout = await prisma.workout.create({
      data: {
        date: new Date(),
        exercises: {
          create: exercises.map((exercise) => ({
            name: exercise.name,
            repCount: exercise.repCount,
            weightCount: exercise.weightCount,
            setCount: exercise.setCount,
            user: { connect: { id: exercise.userId } }, // Connect to the user using the userId
          })),
        },
        user: { connect: { id: exercises[0].userId } }, // Connect to the user using the userId
      },
      include: {
        exercises: true,
      },
    });

    return res.status(200).json(createdWorkout);
  } catch (error) {
    console.error("Error creating workout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
