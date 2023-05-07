import React from "react";
import useWorkoutStore from "../hooks/useWorkout";

import WorkoutPlanItem from "./WorkoutPlanItem";

const WorkoutPlan = () => {
  const workoutPlan = useWorkoutStore();

  return (
    <div>
      {workoutPlan.exercises.map((exercise) => (
        <WorkoutPlanItem
          exerciseTitle={exercise.name}
          repValue={exercise.reps}
          weightValue={exercise.weight}
          setValue={exercise.sets}
        />
      ))}
    </div>
  );
};

export default WorkoutPlan;
