import React from "react";
import HeartButton from "../HeartButton";
import { AiFillYoutube } from "react-icons/ai";
import Link from "next/link";
import useWorkoutStore from "../hooks/useWorkout";

interface ExerciseCardProps {
  Name: string;
  Type: string;
  PrimaryMusclesOne: string;
  PrimaryMusclesTwo?: string;
  SecondaryMusclesOne: string;
  SecondaryMusclesTwo?: string;
  YoutubeLink: string;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({
  Name,
  Type,
  PrimaryMusclesOne,
  PrimaryMusclesTwo,
  SecondaryMusclesOne,
  SecondaryMusclesTwo,
  YoutubeLink,
}) => {
  const workoutPlan = useWorkoutStore();

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <div
            onClick={() => workoutPlan.addToWorkout({ name: Name, id: Name })}
            className="absolute top-3 right-3"
          >
            <HeartButton />
          </div>
          <div className="font-semibold text-lg">{Name}</div>
          <div className="font-light">{Type}</div>
          <div className="flex flex-row items-center">
            <div>{PrimaryMusclesOne}</div>
            {PrimaryMusclesTwo && <div>, {PrimaryMusclesTwo}</div>}
          </div>
          <div className="flex flex-row items-center">
            <div>{SecondaryMusclesOne}</div>
            {SecondaryMusclesTwo && <div>, {SecondaryMusclesTwo}</div>}
          </div>
          <div className="flex">
            <Link
              className="flex"
              href={YoutubeLink}
              target="_blank"
              rel="noreferrer"
            >
              <AiFillYoutube className="fill-red-500" size={24} />
              <div>Demo Link</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
