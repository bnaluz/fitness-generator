import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import WorkoutPlanItem from "./WorkoutPlanItem";
import useWorkoutStore, { Exercise } from "../hooks/useWorkout";
import { SafeUser } from "@/types";
import toast from "react-hot-toast";

interface WorkoutPlanProps {
  currentUser?: SafeUser | null;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = () => {
  const [saving, setSaving] = useState(false);
  const workoutPlan = useWorkoutStore();
  const { data: session } = useSession();
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);
  const [nameWorkout, setNameWorkout] = useState("");

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const nameHandler = (e: any) => {
    setNameWorkout(e.target.value);
  };

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

      console.log(workoutPlan);
      // Prepare the workout data to be sent to the server
      const workoutData = {
        date: new Date(),
        title: `${nameWorkout}`,
        userId: currentUser?.id,
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
        workoutPlan.reset();
      }
    } catch (error) {
      console.error("Error saving workout:", error);
    }
    toast.success("Workout Saved!");
    setNameWorkout("");
    setSaving(false);
  };

  return (
    <div className="bg-white mt-12 pt-10 pb-8 px-4 md:px-8 max-w-[1640px] mx-auto rounded-xl">
      <h2 className="text-3xl font-bold pb-4 text-center underline">
        Your Workout
      </h2>
      <div className="mb-4">
        <div className="px-2 text-lg underline mb-2">Name your workout</div>
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          onChange={nameHandler}
          value={nameWorkout}
          placeholder="Ex: Chest and Triceps"
        />
      </div>
      <div className="space-y-4">
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
      <button
        className="bg-[#23237f]  hover:bg-[#118ab2] text-white font-bold py-2 px-4 rounded mt-4 w-full"
        onClick={saveWorkout}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Workout"}
      </button>
    </div>
  );
};

export default WorkoutPlan;
