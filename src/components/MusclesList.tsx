import React, { useEffect, useState } from "react";

const MusclesList = ({ onMuscleChange }: any) => {
  const [allMuscles, setAllMuscles] = useState();

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

  console.log(allMuscles);

  return (
    <div>
      <div className="grid grid-cols-2 border">
        {allMuscles.map((muscle: string) => (
          <div key={Math.random()}>
            <button onClick={onMuscleChange}>{muscle}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusclesList;
