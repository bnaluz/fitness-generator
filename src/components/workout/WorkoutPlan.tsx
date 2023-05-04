import React from "react";
import useWorkoutStore from "../hooks/useWorkout";

const WorkoutPlan = () => {
  const workoutPlan = useWorkoutStore();

  return (
    <div>
      {workoutPlan.exercises.map((item) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
};

export default WorkoutPlan;
