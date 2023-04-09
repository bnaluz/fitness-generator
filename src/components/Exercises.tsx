import Link from "next/link";
import { useState } from "react";
import MusclesList from "./MusclesList";

function Exercises() {
  const [pickedExercises, setPickedExercises] = useState([]);

  // const [show, setShow] = useState(false);

  const exerciseFetchHandler = async (selectedMuscle: string) => {
    const options = {
      headers: {
        Muscle: selectedMuscle,
      },
    };
    await fetch("/api/getExercises", options)
      .then((response) => response.json())
      .then((data) => setPickedExercises(data));
    // setShow(true);
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <MusclesList onMuscleChange={exerciseFetchHandler} />
          {pickedExercises.length === 0 && (
            <div className="align-middle ml-12 mt-24">
              No exercises for this muscle group yet!
            </div>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-3">
            {pickedExercises.map((singleExercise) => (
              <div
                className="max-w-md bg-slate-400 mx-2 my-1 overflow-hidden"
                key={Math.random()}
              >
                <li className="italic font-bold">{singleExercise.Name}</li>
                {/* <li>{singleExercise.Force}</li> */}
                <li>{singleExercise.Type}</li>
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
                  <li>Youtube Link</li>
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
