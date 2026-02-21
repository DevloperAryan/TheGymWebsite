
export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  duration: string;
  intensity: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  image: string;
}

export interface UserPreferences {
  goal: string;
  fitnessLevel: string;
  cuisine: string;
  availableTime: string;
}

export interface UserPreferences {
  goal: string;
  fitnessLevel: string;
  cuisine: string;
  availableTime: string;
  age: number;
  weight: number;
  gender: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tips: string;
}

export interface Meal {
  mealName: string;
  items: string[];
  macros: string;
}

export interface FitnessPlan {
  title: string;
  overview: string;
  nutritionStats: {
    dailyCalories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  workout: {
    splitName: string;
    warmup: string[];
    exercises: Exercise[];
    cooldown: string[];
  };
  diet: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
    postWorkout: Meal;
  };
}

export interface UserPreferences {
  goal: string;
  fitnessLevel: string;
  cuisine: string;
  availableTime: string;
  age: number;
  weight: number;
  gender: string;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  tips: string;
  targetMuscle: string;
}

export interface Meal {
  mealName: string;
  items: string[];
  macros: string;
}

export interface FitnessPlan {
  title: string;
  overview: string;
  nutritionStats: {
    dailyCalories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  workout: {
    splitName: string;
    warmup: string[];
    exercises: Exercise[];
    cooldown: string[];
  };
  diet: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
    postWorkout: Meal;
  };
}