import React, { useState, useMemo, useEffect } from "react";
import { getAIFitnessPlan } from "../services/geminiService";
import { UserPreferences, FitnessPlan, Exercise } from "../types";
import {
  Bot,
  ChevronDown,
  Sparkles,
  FlameKindling,
  Dam,
  Dumbbell,
  Soup,
  Trash2,
  NotepadText,
  Database
} from "lucide-react";

import AiPlaceholder from "./AiPlaceholder";
import PreAiPlcHolder from "./PreAiPlcHolder";

const AiTrainer: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [showInputs, setShowInputs] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const [plan, setPlan] = useState<FitnessPlan | null>(null);
  const [activeTab, setActiveTab] = useState<"workout" | "diet">("workout");
  const STORAGE_KEY = "aiFitnessPlan_v1";

  const [prefs, setPrefs] = useState<UserPreferences>({
    goal: "Muscle Gain",
    fitnessLevel: "Beginner",
    cuisine: "Vegetarian",
    availableTime: "60",
    age: 25,
    weight: 70,
    gender: "Male",
  });

  const handleClearStoredPlan = () => {
    localStorage.removeItem(STORAGE_KEY);
    setPlan(null);
    setShowInputs(true);
    setShowNote(false);
  };

  const handleEditPreferences = () => {
    setShowInputs(true);
    setShowNote(false);
  };

  useEffect(() => {
    const storedPlan = localStorage.getItem(STORAGE_KEY);

    if (storedPlan) {
      try {
        const parsedPlan = JSON.parse(storedPlan) as FitnessPlan;
        setPlan(parsedPlan);
        setShowInputs(false); // hide inputs if plan exists
        setShowNote(true);
      } catch (err) {
        console.warn("Invalid stored AI plan");
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  const handleGenerate = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const result = await getAIFitnessPlan(prefs);

      setPlan(result);
      // persist generated plan so it's shown until user generates a new one
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
        setShowInputs(false); // hide inputs after generation
        setShowNote(true); //show note atfer plan generation
      } catch (e) {
        console.warn("Failed to save plan to localStorage", e);
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to generate plan.";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // Group exercises by target muscle (from AiTrainer3.tsx reference)
  const groupedExercises = useMemo(() => {
    if (!plan?.workout?.exercises) return {} as Record<string, Exercise[]>;
    return plan.workout.exercises.reduce(
      (acc: Record<string, Exercise[]>, ex: Exercise) => {
        const key = (ex.targetMuscle as string) || "General";
        if (!acc[key]) acc[key] = [];
        acc[key].push(ex);
        return acc;
      },
      {} as Record<string, Exercise[]>
    );
  }, [plan]);

  return (
    <div className=" max-w-7xl mx-auto p-4 lg:p-12 min-h-screen flex flex-col lg:flex-row gap-12 items-start">
      {/* LEFT COLUMN: Input & Branding */}
      <div className="flex-1 w-full space-y-6 animate-fade-in-up z-1">
        <div className="mb-2">
          <div className="flex items-center gap-2 text-orange-500 uppercase tracking-widest font-bold text-sm">
            <Bot className="w-6 h-6" />
            AI PERSONAL COACH
          </div>
          <h2 className="font-bebas text-5xl md:text-7xl">
            PERSONALIZED BY <span className="gradient-text">INTELLIGENCE</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-4 leading-relaxed">
            Our proprietary AI engine analyzes your lifestyle and cultural
            preferences to create the perfect workout and nutrition synergy. No
            generic plans, just pure results.
          </p>
        </div>

        {/* Input Grid */}

        {showInputs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
            {/* Primary Goal - Full Width */}
            <div>
              <label className="block text-xs text-zinc-500 uppercase font-bold px-2 py-2">
                Primary Goal
              </label>
              <div className="relative">
                <select
                  className="w-full bg-zinc-900 border-2 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
                  value={prefs.goal}
                  onChange={(e) => setPrefs({ ...prefs, goal: e.target.value })}
                >
                  <option>Muscle Gain</option>
                  <option>Fat Loss</option>
                  <option>Strength & Power</option>
                  <option>General Fitness</option>
                  <option>Endurance</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown size={22} />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 uppercase font-bold px-2 py-2">
                Fitness Level
              </label>
              <div className="relative">
                <select
                  className="w-full bg-zinc-900 border-2 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
                  value={prefs.fitnessLevel}
                  onChange={(e) =>
                    setPrefs({ ...prefs, fitnessLevel: e.target.value })
                  }
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown size={22} />
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-zinc-500 uppercase font-bold px-2 py-2">
                Meal Type
              </label>
              <div className="relative">
                <select
                  className="w-full bg-zinc-900 border-2 border-white/20 rounded-xl px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors cursor-pointer appearance-none"
                  value={prefs.cuisine}
                  onChange={(e) =>
                    setPrefs({ ...prefs, cuisine: e.target.value })
                  }
                >
                  <option>Vegetarian</option>
                  <option>Non-Vegetarian</option>
                  <option>Vegan</option>
                  <option>Eggetarian (Vegetarian but eat Eggs)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                  <ChevronDown size={22} />
                </div>
              </div>
            </div>

            {/* Compact secondary inputs */}
            <div className="md:col-span-2 grid grid-cols-3 gap-4">
              <div className="bg-zinc-900/70 rounded-xl p-2 border-2 border-white/20 text-center">
                <label className="block text-[10px] text-zinc-500 uppercase font-bold">
                  Time (Min)
                </label>
                <input
                  type="number"
                  value={prefs.availableTime}
                  onChange={(e) =>
                    setPrefs({ ...prefs, availableTime: e.target.value })
                  }
                  className="bg-transparent text-white w-full text-center font-bold outline-none"
                />
              </div>
              <div className="bg-zinc-900/70 rounded-xl p-2 border-2 border-white/20 text-center">
                <label className="block text-[10px] text-zinc-500 uppercase font-bold">
                  Weight (Kg)
                </label>
                <input
                  type="number"
                  value={prefs.weight}
                  onChange={(e) =>
                    setPrefs({
                      ...prefs,
                      weight: parseInt(e.target.value) || 0,
                    })
                  }
                  className="bg-transparent text-white w-full text-center font-bold outline-none"
                />
              </div>
              <div className="bg-zinc-900/30 rounded-xl p-2 border-2 border-white/20 text-center">
                <label className="block text-[10px] text-zinc-500 uppercase font-bold">
                  Age
                </label>
                <input
                  type="number"
                  value={prefs.age}
                  onChange={(e) =>
                    setPrefs({ ...prefs, age: parseInt(e.target.value) || 0 })
                  }
                  className="bg-transparent text-white w-full text-center font-bold outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {showNote && (
          <div className=" border-orange-500 border-2 rounded-xl bg-zinc-950 px-4 py-6 flex flex-col items-center gap-2 lg:my-3">
            <h3 className="flex gap-1">
              <NotepadText size={28} />
              <span className="text-orange-700 text-xl font-rubix">NOTE*</span>
            </h3>
            <p className="text-zinc-400 font-akaya text-xl text-center">
              The generated plan has been stored permanently on <span className="text-orange-300 inline-flex items-center align-middle gap-[3px]"><Database size={16}/> Local Storage</span> of your Browser. This will not Delete until you will not <span className="text-orange-600">Delete</span> it manually. Generating new Plan will Overwrite the previuos plan.
            </p>
          </div>
        )}

        {!showInputs && (
          <button
            type="button"
            onClick={handleEditPreferences}
            className="w-full border-2 border-white/15 bg-zinc-900/40 backdrop-blur py-4 rounded-xl font-bold text-sm uppercase tracking-widest text-zinc-200 hover:border-orange-500/40 hover:text-orange-200 transition-colors cursor-pointer"
          >
            Edit Preferences
          </button>
        )}

        <button
          className="w-full bg-white text-black transition-colors py-5 rounded-xl font-black text-xl flex items-center justify-center gap-3 shadow-lg shadow-white/5 active:scale-95 transform duration-200 hover:bg-orange-500 hover:text-zinc-100 cursor-pointer"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <>
              <div className="animate-spin h-6 w-6 border-4 border-black border-t-transparent rounded-full " />
              GENERATING...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              {showInputs ? "Generate My AI Plan" : "Generate New Plan"}
            </>
          )}
        </button>
      </div>

      {/* RIGHT COLUMN: Results / Display Panel */}
      <div className="flex-1 w-full bg-black border-2 border-saffron rounded-xl p-1 relative shadow-2xl shadow-saffron/20 min-h-[620px] max-h-[635px] flex flex-col">
        <div className="relative h-full w-full bg-zinc-900/50 rounded-xl backdrop-blur-sm flex flex-col h-[620px]">
          {/* PLACEHOLDER STATE */}
          {!plan && !loading && <PreAiPlcHolder />}

          {/* LOADING STATE */}
          {loading && <AiPlaceholder />}

          {/* RESULTS STATE */}
          {plan && !loading && (
            <div className="max-h-[620px] min-h-[619px] overflow-y-auto box-border">
              <div className="flex-1 flex flex-col h-full animate-fade-in overflow-hidden">
                {/* Result Header */}
                <div className="relative px-6 pt-6 pb-2 border-b border-zinc-800 bg-black/40 rounded-t-[2rem]">
                  <h2 className="text-2xl font-bold text-white mb-1 font-sans max-w-[80%]">
                    {plan?.title}
                  </h2>

                  {/* Delete Plan button */}
                  <button
                    onClick={handleClearStoredPlan}
                    aria-label="Delete"
                    className="absolute top-6 right-6 inline-flex items-center gap-2 rounded-md border border-orange-600 px-3 py-2 text-sm font-medium text-orange-500 hover:bg-red-900 hover:text-white cursor-pointer transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>

                  {plan?.nutritionStats && (
                    <div className="flex gap-4 text-sm font-mono text-yellow-600 font-bold">
                      <span>{plan?.nutritionStats.dailyCalories}kcal</span>
                      <span className="text-zinc-600">|</span>
                      <span>{plan?.nutritionStats.protein} Protein</span>
                    </div>
                  )}
                </div>

                {/* Tabs */}
                <div className="px-6 mt-3">
                  <div className="flex  border-2 rounded-xl gap-2 border-zinc-800 bg-zinc-900/50">
                    <button
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide rounded-xl cursor-pointer transition-all duration-500 flex justify-center gap-3 ${
                        activeTab === "workout"
                          ? "bg-white text-black"
                          : "text-white hover:text-orange-300"
                      }`}
                      onClick={() => setActiveTab("workout")}
                    >
                      <Dumbbell />
                      Workout
                    </button>
                    <button
                      className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide cursor-pointer rounded-xl transition-all duration-500 flex justify-center gap-3 ${
                        activeTab === "diet"
                          ? "bg-white text-black"
                          : "text-white hover:text-orange-300"
                      }`}
                      onClick={() => setActiveTab("diet")}
                    >
                      <Soup />
                      Meal Plan
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                  {activeTab === "workout" && (
                    <div className="space-y-8">
                      {/* Warmup Section */}
                      <div className="bg-zinc-800/50 p-4 pr-0 rounded-xl border border-zinc-700/50">
                        <h4 className="text-saffron text-xs font-bold uppercase mb-2 flex items-center gap-2">
                          <span className="w-1 h-3 bg-saffron rounded-full"></span>
                          <FlameKindling color="orange" /> Warmup
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {plan?.workout.warmup.map((w, i) => (
                            <span
                              key={i}
                              className="text-xs bg-black/40 px-3 py-1.5 rounded text-zinc-300 border border-zinc-700"
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Grouped Exercises */}
                      <div className="space-y-6">
                        {Object.entries(groupedExercises).map(
                          ([muscle, exercises]) => (
                            <div key={muscle}>
                              <h4 className="text-orange-500 text-xs font-black uppercase tracking-widest mb-3 pl-1 flex items-center gap-3">
                                {muscle}
                                <div className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></div>
                              </h4>
                              <div className="space-y-3">
                                {exercises.map((ex, i) => (
                                  <div
                                    key={i}
                                    className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center group hover:border-saffron/50 transition-colors"
                                  >
                                    <div>
                                      <div className="font-bold text-white mb-1">
                                        {ex.name}
                                      </div>
                                      <div className="text-xs text-zinc-400">
                                        {ex.sets} Sets × {ex.reps}
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs font-mono text-saffron bg-saffron/10 px-2 py-1 rounded">
                                        {ex.rest}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        )}
                      </div>

                      {/* Cooldown Section */}
                      {plan?.workout.cooldown &&
                        plan?.workout.cooldown.length > 0 && (
                          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50">
                            <h4 className="text-zinc-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                              <span className="w-1 h-3 bg-zinc-500 rounded-full"></span>{" "}
                              <Dam color="skyBlue" />
                              Cooldown
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {plan.workout.cooldown.map((w, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-black/40 px-3 py-1.5 rounded text-zinc-300 border border-zinc-700"
                                >
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                    </div>
                  )}

                  {activeTab === "diet" && (
                    <div className="space-y-4">
                      {[
                        { label: "Breakfast", data: plan?.diet?.breakfast },
                        { label: "Lunch", data: plan?.diet?.lunch },
                        { label: "Snack", data: plan?.diet?.snack },
                        { label: "Dinner", data: plan?.diet?.dinner },
                        {
                          label: "Post-Workout",
                          data: plan?.diet?.postWorkout,
                        },
                      ].map((meal, idx) =>
                        meal.data ? (
                          <div
                            key={idx}
                            className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[12px] uppercase font-extrabold  text-orange-500 bg-zinc-800 px-2 py-0.5 rounded">
                                {meal.label}
                              </span>
                              <span className="text-[11px] font-sans font-bold text-yellow-600">
                                {meal.data.macros}
                              </span>
                            </div>
                            <h4 className="font-bold text-white text-sm mb-2">
                              {meal.data.mealName}
                            </h4>
                            <div className="text-sm text-zinc-400 leading-relaxed italic">
                              {meal.data.items.join(", ")}
                            </div>
                          </div>
                        ) : null
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AiTrainer;
