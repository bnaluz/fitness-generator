import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "@/libs/prismadb";
import { Workout } from "@prisma/client";

export default async function saveWorkout(
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
    const { exercises } = req.body;

    // Create a new workout object
    const workoutData: Workout = {
      user: {
        connect: {
          email: userEmail,
        },
      },
      exercises: {
        create: exercises,
      },
    };

    // Save the workout to the database
    const savedWorkout = await prisma.workout.create({
      data: workoutData,
    });

    return res.status(200).json(savedWorkout);
  } catch (error: any) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
