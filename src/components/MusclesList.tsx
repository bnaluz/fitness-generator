import React, { useEffect, useState } from "react";

const MusclesList = ({ onMuscleChange }: any) => {
  const [allMuscles, setAllMuscles] = useState([]);

  useEffect(() => {
    const musclesFetchHandler = async () => {
      await fetch("/api/getMuscles")
        .then((response) => response.json())
        .then((data) => setAllMuscles(data));
    };
    musclesFetchHandler();
  }, []);

  if (!allMuscles) {
    return null;
  }

  return (
    <div className="bg-white rounded shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Muscles List</h2>
      {allMuscles.length === 0 && (
        <div className="text-gray-500 mb-4">Loading muscle options!</div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {allMuscles.map((muscle: string) => (
          <button
            key={muscle}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 w-full"
            onClick={() => onMuscleChange(muscle)}
          >
            {muscle}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MusclesList;
