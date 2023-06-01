import FetchedWorkouts from "@/components/workout/FetchedWorkouts";
import React from "react";

const userWorkout = () => {
  return (
    <div className="pt-20 w-full h-screen">
      <div className="pl-8 mt-4 pt-10 uppercase text-2xl tracking-widest text-blue-800">
        Your Workouts
      </div>
      <FetchedWorkouts />
    </div>
  );
};

export default userWorkout;
