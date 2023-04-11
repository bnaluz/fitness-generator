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
    <div>
      <div>Muscles List</div>
      {allMuscles.length === 0 && <div>Loading muscle options!</div>}
      <div className="grid grid-cols-2 border ">
        {allMuscles.map((muscle: string) => (
          <div key={muscle}>
            <button onClick={() => onMuscleChange(muscle)}>{muscle}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusclesList;
