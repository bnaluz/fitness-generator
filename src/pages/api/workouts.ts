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
  const session = await getSession({ req });
  const { exercises } = req.body as { exercises: ExerciseData[] };

  try {
    // Retrieve the user from the database based on the session
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
    });

    // Create the workout and connect it to the user
    const workout = await prisma.workout.create({
      data: {
        date: new Date(),
        exercises: {
          create: exercises.map((exercise) => ({
            name: exercise.name,
            repCount: exercise.repCount,
            weightCount: exercise.weightCount,
            setCount: exercise.setCount,
            userId: user?.id as string,
          })),
        },
        userId: user?.id as string,
      },
    });

    if (workout) {
      return res.status(200).json({ message: `${workout}` });
    }

    return res.status(200).json(workout);
  } catch (error) {
    console.error("Error saving workout:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "@/libs/prismadb";
// import { getSession } from "next-auth/react";

// interface ExerciseData {
//   name: string;
//   repCount: number;
//   weightCount: number;
//   setCount: number;
//   user: string;
// }

// export default async function createWorkout(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void> {
//   const session = await getSession({ req });

//   if (!session?.user?.email) {
//     return res.status(401).json({ error: "User not authenticated" });
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         email: session.user.email as string,
//       },
//     });

//     if (user) {
//       return res.status(200).json({ message: `signed in as ${user.email}` });
//     }

//     if (!user) {
//       return res.status(400).json({ message: "User not found" });
//     }

//     const { exercises } = req.body as { exercises: ExerciseData[] };
//     if (exercises) {
//       return res.status(200).json({ message: "data passed" });
//     }

//     const exerciseCreateData = exercises.map((exercise) => ({
//       name: exercise.name,
//       repCount: exercise.repCount,
//       weightCount: exercise.weightCount,
//       setCount: exercise.setCount,
//       user: { connect: { id: user.id } },
//     }));

//     const workout = await prisma.workout.create({
//       data: {
//         date: new Date(),
//         exercises: {
//           create: exerciseCreateData,
//         },
//         user: { connect: { id: user.id } },
//       },
//     });

//     return res.status(200).json(workout);
//   } catch (error) {
//     console.error("Error creating workout:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// }
