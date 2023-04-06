import Link from "next/link";
import { useState } from "react";
import MusclesList from "./MusclesList";

function Exercises() {
  const [pickedExercises, setPickedExercises] = useState([]);

  const [show, setShow] = useState(false);

  const exerciseFetchHandler = async (selectedMuscle: string) => {
    const options = {
      headers: {
        Muscle: selectedMuscle,
      },
    };
    await fetch("/api/getExercises", options)
      .then((response) => response.json())
      .then((data) => setPickedExercises(data));
    setShow(true);
  };

  return (
    <div>
      <div>
        <div>Exercise Title</div>
        <div>
          <ul>
            {show &&
              pickedExercises.map((singleExercise) => (
                <div key={Math.random()}>
                  <li>{singleExercise.Force}</li>
                  <li>{singleExercise.Name}</li>
                  <li>{singleExercise.Type}</li>
                  <li>{singleExercise["Primary Muscles"]["0"]}</li>

                  <Link
                    href={singleExercise["Youtube link"]}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <li>{singleExercise["Youtube link"]}</li>
                  </Link>
                </div>
              ))}
          </ul>
          <MusclesList onMuscleChange={exerciseFetchHandler} />
        </div>
        <button
          onClick={() => {
            exerciseFetchHandler("pectoralis major");
          }}
        >
          Click me
        </button>
      </div>
    </div>
  );
}

export default Exercises;

{
  /* <div>
            <button className="mx-4" onClick={exerciseFetchHandler}>
              Click ME
            </button>
          </div>
          <div>
            <button
              onClick={() => {
                exerciseFetchHandler("pectoralis major");
              }}
            >
              Trap
            </button>
            <button
              onClick={() => {
                exerciseFetchHandler("abdominals");
              }}
            >
              Abs
            </button>
            <button
              className="mx-2"
              onClick={() => {
                setPickedExercises([]);
                setShow(false);
              }}
            >
              reset
            </button>
            </div> */
}
