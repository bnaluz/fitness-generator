import React from "react";
import useWorkoutStore from "../hooks/useWorkout";

import WorkoutPlanItem from "./WorkoutPlanItem";

const WorkoutPlan = () => {
  const workoutPlan = useWorkoutStore();

  return (
    <div
      className="bg-white mt-12 pt-10 mb-12 pb-12 max-w-[1640px] mx-auto rounded-xl
    "
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Your Workout</h2>
      <div className="justify-center">
        {workoutPlan.exercises.map((exercise) => (
          <WorkoutPlanItem
            key={exercise.id}
            exerciseTitle={exercise.name}
            repValue={exercise.reps}
            weightValue={exercise.weight}
            setValue={exercise.sets}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
