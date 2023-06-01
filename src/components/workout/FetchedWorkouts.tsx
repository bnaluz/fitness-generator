import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import WorkoutListItem from "./WorkoutListItem";

const FetchedWorkouts = () => {
  const {
    data: workouts,
    isLoading,
    isError,
  } = useQuery("workouts", async () => {
    const response = await axios.get("/api/fetchWorkout");
    return response.data.workouts; // Assuming the API response has a "workouts" property containing the list of workouts
  });

  if (isLoading) {
    return <div>Loading workouts...</div>;
  }

  if (isError) {
    return <div>Error fetching workouts.</div>;
  }

  return (
    <div>
      {workouts.length === 0 ? (
        <div>No workouts found.</div>
      ) : (
        workouts.map((workout: any) => (
          <WorkoutListItem key={workout.id} workout={workout} />
        ))
      )}
    </div>
  );
};

export default FetchedWorkouts;
