import React, { use, useState } from "react";
import useWorkoutStore from "../hooks/useWorkout";

interface WorkoutPlanItemProps {
  exerciseTitle: string;
  repValue: any;
  weightValue: any;
  setValue: any;
}

const WorkoutPlanItem: React.FC<WorkoutPlanItemProps> = ({
  exerciseTitle,
  repValue,
  weightValue,
  setValue,
}) => {
  const { exercises, removeFromWorkout, updateSets, updateReps, updateWeight } =
    useWorkoutStore();

  const exercise = exercises.find((e) => e.name === exerciseTitle);

  if (!exercise) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between py-2 px-4 border-b border-gray-300">
      <span className="font-semibold mb-2 md:mb-0 md:mr-4">
        {exerciseTitle}
      </span>
      <div className="flex flex-col md:flex-row items-center md:space-x-2">
        <label>
          Sets:
          <input
            className="mx-2 my-1 md:my-0 border border-gray-300 rounded-lg px-2 py-1"
            type="number"
            value={setValue}
            min="0"
            placeholder="how many sets?"
            onChange={(e) => updateSets(exercise.id, parseInt(e.target.value))}
          />
        </label>
        <label>
          Reps:
          <input
            className="mx-2 my-1 md:my-0 border border-gray-300 rounded-lg px-2 py-1"
            type="number"
            value={repValue}
            min="0"
            placeholder="how many reps?"
            onChange={(e) => updateReps(exercise.id, parseInt(e.target.value))}
          />
        </label>
        <label>
          Weight:
          <input
            className="mx-2 my-1 md:my-0 border border-gray-300 rounded-lg px-2 py-1"
            type="number"
            value={weightValue}
            placeholder="what weight?"
            onChange={(e) =>
              updateWeight(exercise.id, parseInt(e.target.value))
            }
            min="0"
          />
        </label>
        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600"
          onClick={() => removeFromWorkout(exercise)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanItem;
