import React, { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import WorkoutPlanItem from "./WorkoutPlanItem";
import useWorkoutStore from "../hooks/useWorkout";

const WorkoutPlan: React.FC = () => {
  const [saving, setSaving] = useState(false);
  const workoutPlan = useWorkoutStore();
  const { data: session } = useSession();

  const saveWorkout = async (): Promise<void> => {
    setSaving(true);

    try {
      if (!session?.user?.email) {
        throw new Error("User not authenticated");
      }

      // Prepare the workout data to be sent to the server
      const workoutData = {
        exercises: workoutPlan.exercises.map((exercise) => ({
          name: exercise.name,
          repCount: exercise.repCount,
          weightCount: exercise.weightCount,
          setCount: exercise.setCount,
        })),
      };

      // Send a POST request to save the workout
      await axios.post("/api/workouts", workoutData);

      // Reset the workout plan
      // workoutPlan.reset();

      // Show a success message or perform any additional actions
      console.log("Workout saved successfully!");
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
        {workoutPlan.exercises.map((exercise) => (
          <WorkoutPlanItem
            key={exercise.id}
            exerciseTitle={exercise.name}
            repValue={exercise.repCount}
            weightValue={exercise.weightCount}
            setValue={exercise.setCount}
          />
        ))}
      </div>
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
