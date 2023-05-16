import { create } from "zustand";

type Exercise = {
  setCount?: number;
  name: any;
  id: any;
  repCount?: number;
  weightCount?: number;
};

interface WorkoutStore {
  exercises: Exercise[];
  addToWorkout: (exercise: Exercise) => void;
  removeFromWorkout: (exercise: Exercise) => void;
  updateSets: (exerciseId: any, setCount: number) => void;
  updateReps: (exerciseId: any, repCount: number) => void;
  updateWeight: (exerciseId: any, weightCount: number) => void;
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
            { ...exercise, setCount: 0, repCount: 0, weightCount: 0 },
          ],
        };
      }
    }),

  removeFromWorkout: (exercise) =>
    set((state) => ({
      exercises: state.exercises.filter((i) => i.id !== exercise.id),
    })),

  updateSets: (exerciseId, setCount) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, setCount } : i
      ),
    })),

  updateReps: (exerciseId, repCount) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, repCount } : i
      ),
    })),

  updateWeight: (exerciseId, weightCount) =>
    set((state) => ({
      exercises: state.exercises.map((i) =>
        i.id === exerciseId ? { ...i, weightCount } : i
      ),
    })),
}));

export default useWorkoutStore;
