import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";

interface ExerciseData {
  name: string;
  repCount: number;
  weightCount: number;
  setCount: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession({ req });
    const { exercises } = req.body as { exercises: ExerciseData[] };
    console.log(req.body);
    console.log("hello");
    // Check if the session and user email are defined
    if (!session || !session.user?.email) {
      return res.status(400).json({ message: "User not authenticated" });
    }

    // Retrieve the user from the database based on the session
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create the workout and connect it to the user
    const workout = await prisma.workout.create({
      data: {
        date: new Date(),
        exercises: {
          create: exercises?.map((exercise) => ({
            name: exercise.name,
            repCount: exercise.repCount,
            weightCount: exercise.weightCount,
            setCount: exercise.setCount,
            userId: user.id,
          })),
        },
        userId: user.id,
      },
      include: {
        exercises: true, // Include the exercises in the response
      },
    });

    return res.status(200).json(workout);
  } catch (error) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
