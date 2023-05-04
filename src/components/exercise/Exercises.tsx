import { useState } from "react";
import MusclesList from "../MusclesList";
import ExerciseCard from "./ExerciseCard";

type exerciseTypes = {
  Name: string;
  Type: string;
  ["Primary Muscles"]: string;
  SecondaryMuscles: string;
  ["Youtube link"]: string;
};

function Exercises() {
  const [pickedExercises, setPickedExercises] = useState<exerciseTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const exerciseFetchHandler = async (selectedMuscle: string) => {
    setIsLoading(true);
    const options = {
      headers: {
        Muscle: selectedMuscle,
      },
    };
    await fetch("/api/getExercises", options)
      .then((response) => response.json())
      .then((data) => setPickedExercises(data));
    setIsLoading(false);
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <MusclesList onMuscleChange={exerciseFetchHandler} />
          {isLoading && <div>Loading...</div>}
          {pickedExercises.length === 0 && !isLoading && (
            <div className="align-middle ml-12 mt-24">
              No exercises for this muscle group yet!
            </div>
          )}
          <ul className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {!isLoading &&
              pickedExercises.map((singleExercise) => (
                <ExerciseCard
                  Name={singleExercise.Name}
                  Type={singleExercise.Type}
                  PrimaryMusclesOne={singleExercise["Primary Muscles"][0]}
                  PrimaryMusclesTwo={singleExercise["Primary Muscles"][1]}
                  SecondaryMusclesOne={singleExercise.SecondaryMuscles[0]}
                  SecondaryMusclesTwo={singleExercise.SecondaryMuscles[1]}
                  YoutubeLink={singleExercise["Youtube link"]}
                />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Exercises;
