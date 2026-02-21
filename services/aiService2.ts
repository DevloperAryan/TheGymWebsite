import { UserPreferences, FitnessPlan } from "../types";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "google/gemini-2.0-flash-exp:free";

export const getAIFitnessPlan = async (
  prefs: UserPreferences
): Promise<FitnessPlan> => {

  const prompt = `
You are an elite expert trainer at "The Indian Gym". Your expertise blends modern, science-based hypertrophy and strength training with Indian lifestyle and diet.

Create a highly systematic daily workout and meal plan for:
- Goal: ${prefs.goal}
- Level: ${prefs.fitnessLevel}
- Diet: ${prefs.cuisine}
- Time: ${prefs.availableTime} mins/day
- Profile: ${prefs.gender}, ${prefs.age} years old, ${prefs.weight} kg.

Requirements:
1. Workout with sets, reps, rest.
2. Categorize each exercise by primary muscle.
3. Indian meals with realistic portions.
4. Motivating, professional tone.

Return ONLY valid JSON. No explanation. No markdown.
`;

  const response = await fetch(OPENROUTER_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin, // required by OpenRouter
      "X-Title": "AI Fitness Planner"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = await response.json();

  const text = data.choices?.[0]?.message?.content;

  if (!text) {
    throw new Error("No response from AI");
  }

  try {
    return JSON.parse(text) as FitnessPlan;
  } catch (e) {
    console.error("Invalid JSON from AI:", text);
    throw new Error("AI returned invalid JSON");
  }
};
