import { create } from "zustand";

type Exercise = {
  sets?: number;
  name: any;
  id: any;
  reps?: number;
  weight?: number;
};

interface WorkoutStore {
  exercises: Exercise[];
  addToWorkout: (exercise: Exercise) => void;
  removeFromWorkout: (exercise: Exercise) => void;
  updateSets: (exerciseId: any, sets: number) => void;
  updateReps: (exerciseId: any, reps: number) => void;
  updateWeight: (exerciseId: any, weight: number) => void;
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
        return {
          exercises: [
            ...state.exercises,
            { ...exercise, sets: 0, reps: 0, weight: 0 },
          ],
        };
      }
    }),

  removeFromWorkout: (exercise) =>
    set((state) => ({
      exercises: state.exercises.filter((i) => i.id !== exercise.id),
    })),

  updateSets: (exerciseId, sets) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, sets } : i
      ),
    })),

  updateReps: (exerciseId, reps) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, reps } : i
      ),
    })),

  updateWeight: (exerciseId, weight) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, weight } : i
      ),
    })),
}));

export default useWorkoutStore;
