import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";
import { Exercise, Workout } from "@prisma/client";

type CreateWorkoutRequestData = {
  exercises: {
    name: string;
    repCount?: number | null;
    weightCount?: number | null;
    setCount?: number | null;
  }[];
};

export default async function createWorkout(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const session = await getSession({ req });

    // Check if the user is authenticated
    if (!session?.user?.email) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userEmail = session.user.email as string;

    // Retrieve the current user from the database
    const currentUser = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!currentUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Extract the workout data from the request body
    const { exercises } = req.body as CreateWorkoutRequestData;

    // Create the exercises for the workout
    const workoutExercises: Exercise[] = exercises.map((exercise) => ({
      id: "", // Placeholder value, the actual ID will be generated by the database
      workoutId: "", // Placeholder value, will be set when the workout is created
      name: exercise.name,
      repCount: exercise.repCount || null,
      weightCount: exercise.weightCount || null,
      setCount: exercise.setCount || null,
      userEmail: userEmail,
    }));

    // Save the workout and exercises to the database
    const savedWorkout = await prisma.workout.create({
      data: {
        userId: currentUser.id,
        date: new Date(),
        exercises: {
          create: workoutExercises,
        },
      },
    });

    return res.status(200).json(savedWorkout);
  } catch (error: any) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
