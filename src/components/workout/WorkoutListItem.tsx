import React from "react";
import { Exercise } from "../hooks/useWorkout";

interface WorkoutListItemProps {
  workout: {
    title: string;
    date: string;
    exercises: Exercise[];
  };
}

const WorkoutListItem: React.FC<WorkoutListItemProps> = ({ workout }) => {
  return (
    <div className="bg-white rounded-xl p-6 mb-4">
      <h3 className="text-xl font-semibold mb-2">{workout.title}</h3>
      <p className="text-gray-500 mb-4">{workout.date}</p>
      <ul>
        {workout.exercises.map((exercise) => (
          <li key={exercise.id} className="mb-2">
            <p className="text-gray-700">Name: {exercise.name}</p>
            <p className="text-gray-700">Set Count: {exercise.setCount}</p>
            <p className="text-gray-700">Rep Count: {exercise.repCount}</p>
            <p className="text-gray-700">
              Weight Count: {exercise.weightCount}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutListItem;
