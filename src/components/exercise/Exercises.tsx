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
  const [isTouched, setIsTouched] = useState(false);

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
    setIsTouched(true);
  };

  return (
    <div>
      <MusclesList onMuscleChange={exerciseFetchHandler} />
      <div>
        <div className="pt-10">
          {isLoading && <div>Loading...</div>}
          {pickedExercises.length === 0 && !isLoading && isTouched && (
            <div className="bg-gray-100 h-60vh flex items-center justify-center">
              <div className="text-center">
                <div className="text-gray-500 text-lg font-medium mb-4">
                  No exercises for this muscle group yet!
                </div>
                <img
                  src="https://source.unsplash.com/500x500/?fitness"
                  alt="No exercises available"
                  className="mx-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {!isLoading &&
              pickedExercises.map((singleExercise) => (
                <ExerciseCard
                  key={singleExercise.Name}
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
