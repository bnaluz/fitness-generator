import prisma from "../../libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";
import { Exercise } from "@/components/hooks/useWorkout";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      date,
      userId,
      exercises,
      title,
    }: { title: string; date: Date; userId: string; exercises: Exercise[] } =
      req.body;
    console.log(exercises);

    try {
      const workout = await prisma.workout.create({
        data: {
          date,
          userId,
          title,
          exercises: {
            create: exercises.map((exercise) => ({
              name: exercise.name,
              repCount: exercise.repCount,
              weightCount: exercise.weightCount,
              setCount: exercise.setCount,
            })),
          },
        },
      });

      res
        .status(200)
        .json({ message: "Workout created successfully", workout });
    } catch (error) {
      console.error("Error creating workout:", error);
      res.status(500).json({ error: "Failed to create workout" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
