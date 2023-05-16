import React from "react";
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
  const currentUser = getCurrentUser();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { exercises } = req.body;

    // Prepare the formatted exercises data
    const formattedExercises = exercises.map((exercise: ExerciseData) => ({
      name: exercise.name,
      repCount: exercise.repCount,
      weightCount: exercise.weightCount,
      setCount: exercise.setCount,
    }));

    // Create the workout with exercises using Prisma
    const workout = await prisma.workout.create({
      data: {
        userId: currentUser?.id,
        date: new Date(),
        exercises: {
          create: formattedExercises,
        },
      },
      include: {
        exercises: true,
      },
    });

    return res.status(201).json(workout);
  } catch (error) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
