import prisma from "@/libs/prismadb";
import { getSession } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";

export default async function saveWorkouts(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { exercises } = req.body;

  if (req.body) {
    return res.status(201).json({ message: `${req.body}` });
  }

  try {
    // Get the authenticated session
    const session: Session | null = await getSession({ req });

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Access the authenticated user's email
    const userEmail: string | undefined = session.user?.email ?? undefined;

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Save the workout to the database
    const workout = await prisma.workout.create({
      data: {
        userId: userEmail,
        date: new Date(),
        exercises: {
          create: exercises.map(
            (exercise: {
              name: any;
              repCount: any;
              weightCount: any;
              setCount: any;
            }) => ({
              name: exercise.name,
              repCount: exercise.repCount,
              weightCount: exercise.weightCount,
              setCount: exercise.setCount,
            })
          ),
        },
      },
      include: {
        exercises: true,
      },
    });

    return res.status(200).json(workout);
  } catch (error) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
