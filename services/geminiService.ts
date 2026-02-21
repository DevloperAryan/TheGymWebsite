import { GoogleGenAI, Type } from "@google/genai";
import { UserPreferences, FitnessPlan } from "../types";

export const getAIFitnessPlan = async (prefs: UserPreferences): Promise<FitnessPlan> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error(
      "Missing Gemini API key. Set GEMINI_API_KEY in your env (vite.config defines process.env.API_KEY)."
    );
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are an elite expert trainer at "The Indian Gym". Your expertise blends modern, science-based hypertrophy and strength training (progressive overload, optimal volume) with the Indian lifestyle and dietary habits.
    
    Create a highly systematic daily workout and meal plan for:
    - Goal: ${prefs.goal}
    - Level: ${prefs.fitnessLevel}
    - Diet: ${prefs.cuisine}
    - Time: ${prefs.availableTime} mins/day
    - Profile: ${prefs.gender}, ${prefs.age} years old, ${prefs.weight} kg.

    Requirements:
    1. **Workout**: Must be modern and effective. Include specific sets, reps, and rest times. Mix gym equipment with functional strength.
    2. **Grouping**: Explicitly categorize each exercise by its primary target muscle (e.g., Chest, Back, Legs, Shoulders, Triceps, Biceps, Abs, Cardio).
    3. **Diet**: Suggest realistic Indian meals (e.g., specific dals, paneer, chicken preparations, roti/rice quantities) that hit protein targets.
    4. **Tone**: Motivating, professional, and culturally relevant.

    Return strictly valid JSON matching the schema provided.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
        maxOutputTokens: 4096,
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "overview", "nutritionStats", "workout", "diet"],
          properties: {
            title: { type: Type.STRING, description: "A catchy name for the plan" },
            overview: { type: Type.STRING, description: "Brief strategy summary" },
            nutritionStats: {
              type: Type.OBJECT,
              required: ["dailyCalories", "protein", "carbs", "fats"],
              properties: {
                dailyCalories: { type: Type.STRING },
                protein: { type: Type.STRING },
                carbs: { type: Type.STRING },
                fats: { type: Type.STRING },
              }
            },
            workout: {
              type: Type.OBJECT,
              required: ["splitName", "warmup", "exercises", "cooldown"],
              properties: {
                splitName: { type: Type.STRING, description: "e.g., Push Day, Full Body Power" },
                warmup: { type: Type.ARRAY, items: { type: Type.STRING } },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    required: ["targetMuscle", "name", "sets", "reps", "rest", "tips"],
                    properties: {
                      targetMuscle: { type: Type.STRING, description: "Primary target: Chest, Legs, Back, Shoulders, Arms, Abs, etc." },
                      name: { type: Type.STRING },
                      sets: { type: Type.STRING },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      tips: { type: Type.STRING }
                    }
                  }
                },
                cooldown: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            },
            diet: {
              type: Type.OBJECT,
              required: ["breakfast", "lunch", "snack", "dinner", "postWorkout"],
              properties: {
                breakfast: {
                  type: Type.OBJECT,
                  required: ["mealName", "items", "macros"],
                  properties: {
                    mealName: { type: Type.STRING },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    macros: { type: Type.STRING }
                  }
                },
                lunch: {
                  type: Type.OBJECT,
                  required: ["mealName", "items", "macros"],
                  properties: {
                    mealName: { type: Type.STRING },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    macros: { type: Type.STRING }
                  }
                },
                snack: {
                  type: Type.OBJECT,
                  required: ["mealName", "items", "macros"],
                  properties: {
                    mealName: { type: Type.STRING },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    macros: { type: Type.STRING }
                  }
                },
                dinner: {
                  type: Type.OBJECT,
                  required: ["mealName", "items", "macros"],
                  properties: {
                    mealName: { type: Type.STRING },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    macros: { type: Type.STRING }
                  }
                },
                postWorkout: {
                  type: Type.OBJECT,
                  required: ["mealName", "items", "macros"],
                  properties: {
                    mealName: { type: Type.STRING },
                    items: { type: Type.ARRAY, items: { type: Type.STRING } },
                    macros: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(text) as FitnessPlan;

    // Lightweight runtime validation: fail fast instead of storing partial plans.
    const hasWorkout =
      !!parsed?.workout?.splitName &&
      Array.isArray(parsed?.workout?.warmup) &&
      Array.isArray(parsed?.workout?.exercises) &&
      parsed.workout.exercises.length > 0 &&
      Array.isArray(parsed?.workout?.cooldown);

    const hasDiet =
      !!parsed?.diet?.breakfast?.mealName &&
      Array.isArray(parsed?.diet?.breakfast?.items) &&
      !!parsed?.diet?.lunch?.mealName &&
      !!parsed?.diet?.snack?.mealName &&
      !!parsed?.diet?.dinner?.mealName &&
      !!parsed?.diet?.postWorkout?.mealName;

    if (!parsed?.title || !parsed?.overview || !parsed?.nutritionStats || !hasWorkout || !hasDiet) {
      throw new Error("AI returned an incomplete plan. Please try again.");
    }

    return parsed;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};