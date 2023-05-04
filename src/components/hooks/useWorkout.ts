import { create } from "zustand";

type Exercise = {
  name: any;
  id: any;
  reps?: number;
};

interface WorkoutStore {
  exercises: Exercise[];
  addToWorkout: (exercise: Exercise) => void;
  removeFromWorkout: (exercise: Exercise) => void;
  incrementReps: (exerciseId: any) => void;
}

const useWorkoutStore = create<WorkoutStore>((set) => ({
  exercises: [],

  addToWorkout: (exercise) =>
    set((state) => {
      const existingExercise = state.exercises.find(
        (i) => i.id === exercise.id
      );
      if (existingExercise) {
        return state;
      } else {
        return { exercises: [...state.exercises, { ...exercise, reps: 1 }] };
      }
    }),

  removeFromWorkout: (exercise) =>
    set((state) => ({
      exercises: state.exercises.filter((i) => i.id !== exercise.id),
    })),

  incrementReps: (exerciseId) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, reps: (i.reps || 0) + 1 } : i
      ),
    })),
}));

export default useWorkoutStore;
