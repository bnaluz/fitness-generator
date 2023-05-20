import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import WorkoutPlanItem from "./WorkoutPlanItem";
import useWorkoutStore, { Exercise } from "../hooks/useWorkout";
import { SafeUser } from "@/types";

interface WorkoutPlanProps {
  currentUser?: SafeUser | null;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = () => {
  const [saving, setSaving] = useState(false);
  const workoutPlan = useWorkoutStore();
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/getCurrentUser");
      if (!response.data) {
        setCurrentUser(null);
        return;
      }
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const saveWorkout = async (): Promise<void> => {
    setSaving(true);
    console.log(currentUser);
    try {
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      // Prepare the workout data to be sent to the server
      const workoutData = {
        date: new Date(),
        user: { connect: { id: `${currentUser?.id}` } },
        exercises: workoutPlan.exercises.map((exercise: Exercise) => ({
          name: exercise.name,
          repCount: exercise.repCount,
          weightCount: exercise.weightCount,
          setCount: exercise.setCount,
        })),
      };

      console.log(workoutData);
      // Send a POST request to save the workout
      const response = await axios.post("/api/workout", workoutData);

      if (response.status === 200) {
        console.log("Workout saved successfully!");
        // Reset the workout plan
        workoutPlan.reset();
        // Map the response data to the frontend
        const savedWorkout = response.data;
        // Display the saved workout to the user
        // ...
      } else {
        console.error("Error saving workout:", response.data.message);
      }
    } catch (error) {
      // Handle the error, display an error message, or perform any error-specific actions
      console.error("Error saving workout:", error);
    }

    setSaving(false);
  };

  return (
    <div className="bg-white mt-12 pt-10 mb-12 pb-2 max-w-[1640px] mx-auto rounded-xl">
      <h2 className="text-3xl font-bold pb-6 text-center underline">
        Your Workout
      </h2>
      <div className="justify-center">
        {workoutPlan.exercises.map((exercise: Exercise) => (
          <WorkoutPlanItem
            key={exercise.id}
            exerciseTitle={exercise.name}
            repValue={exercise.repCount}
            weightValue={exercise.weightCount}
            setValue={exercise.setCount}
          />
        ))}
      </div>
      <div>signed in as {currentUser?.name}</div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={saveWorkout}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Workout"}
      </button>
    </div>
  );
};

export default WorkoutPlan;
