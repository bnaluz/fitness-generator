import { create } from "zustand";

type Exercise = {
  name: any;
  id: any;
};

interface WorkoutStore {
  exercises: Exercise[];
  addToWorkout: (exercise: Exercise) => void;
  removeFromWorkout: (exercise: Exercise) => void;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
  exercises: [],

  addToWorkout: (exercise) =>
    set((state) => {
      if (state.exercises.find((i) => i.id === exercise.id)) {
        return state;
      } else {
        return { exercises: [...state.exercises, exercise] };
      }
    }),

  removeFromWorkout: (exercise) =>
    set((state) => ({
      exercises: state.exercises.filter((i) => i.id !== exercise.id),
    })),
}));

export default useWorkoutStore;
