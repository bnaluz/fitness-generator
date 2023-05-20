import prisma from "../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

interface Exercise {
  name: string;
  sets: number;
  reps: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      date,
      userId,
      exercises,
    }: { date: Date; userId: string; exercises: Exercise[] } = req.body;

    try {
      const workout = await prisma.workout.create({
        data: {
          date,
          user: { connect: { id: userId } },
          exercises: {
            create: exercises.map((exercise) => ({
              name: exercise.name,
              sets: exercise.sets,
              reps: exercise.reps,
            })),
          },
        },
      });

      res
        .status(201)
        .json({ message: "Workout created successfully", workout });
    } catch (error) {
      console.error("Error creating workout:", error);
      res.status(500).json({ error: "Failed to create workout" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
