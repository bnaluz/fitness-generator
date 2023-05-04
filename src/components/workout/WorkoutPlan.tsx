import React from "react";
import useWorkoutStore from "../hooks/useWorkout";

const WorkoutPlan = () => {
  const workoutPlan = useWorkoutStore();

  return (
    <div>
      {workoutPlan.exercises.map((item) => (
        <div>{item.name}</div>
      ))}
    </div>
  );
};

export default WorkoutPlan;
