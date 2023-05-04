import React from "react";
import useWorkoutStore from "../hooks/useWorkout";

const WorkoutPlan = () => {
  const workoutPlan = useWorkoutStore();

  return (
    <div>
      <div>
        {workoutPlan.exercises.map((item) => (
          <div className="flex" key={item.name}>
            <div className="mx-1">{item.name}</div>

            <div onClick={() => workoutPlan.incrementReps(item.name)}>
              {item.reps}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlan;
