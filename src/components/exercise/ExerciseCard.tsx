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
    <div className="col-span-1 cursor-pointer group mx-1 my-1">
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-scroll rounded-xl outline">
          <div
            onClick={() => workoutPlan.addToWorkout({ name: Name, id: Name })}
            className="absolute top-3 right-3"
          >
            <HeartButton />
          </div>
          <div className="mx-2">
            <div className="mt-4 md:mt-8 font-semibold text-md">{Name}</div>
            <div className="font-light">Exercise Type: {Type}</div>
            <div className="flex flex-col">
              <div className="underline">Primary Muscles:</div>
              <div>{PrimaryMusclesOne}</div>
              {PrimaryMusclesTwo && <div>{PrimaryMusclesTwo}</div>}
            </div>
            <div className="flex flex-col">
              <div className="underline">Secondary Muscles:</div>
              <div>{SecondaryMusclesOne}</div>
              {SecondaryMusclesTwo && <div>{SecondaryMusclesTwo}</div>}
            </div>
            <div className="flex flex-col md:flex-row md:justify-between">
              <Link
                className="flex items-center mb-2 md:mb-0"
                href={YoutubeLink}
                target="_blank"
                rel="noreferrer"
              >
                <AiFillYoutube className="fill-red-500 mr-2" size={24} />
                <div>Watch Demo</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
