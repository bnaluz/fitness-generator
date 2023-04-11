import Link from "next/link";
import { useState } from "react";
import MusclesList from "./MusclesList";

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
          <ul className="grid grid-cols-1 md:grid-cols-3">
            {!isLoading &&
              pickedExercises.map((singleExercise) => (
                <div
                  className=" bg-slate-400 mx-2 my-1 overflow-hidden relative"
                  key={singleExercise.Name}
                >
                  <li className="italic font-bold">{singleExercise.Name}</li>
                  <li>
                    Exercise Type: <br></br> {singleExercise.Type}
                  </li>
                  <div className="bg-blue-200">
                    Primary Muscles:
                    <li>{singleExercise["Primary Muscles"]["0"]}</li>
                    <li>{singleExercise["Primary Muscles"]["1"]}</li>
                  </div>
                  <div className="bg-blue-300">
                    Secondary Muscles:
                    <li>{singleExercise.SecondaryMuscles["0"]}</li>
                    <li>{singleExercise.SecondaryMuscles["1"]}</li>
                  </div>
                  <Link
                    href={singleExercise["Youtube link"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <li className="absolute bottom-0 mt-8">Youtube Link</li>
                  </Link>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Exercises;
