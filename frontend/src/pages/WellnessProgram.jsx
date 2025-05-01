import React, { useState } from "react";
import { RefreshCcw, CheckCircle2 } from "lucide-react";

const wellnessData = {
  Hydration: {
    tips: [
      "Drink a glass of water first thing in the morning.",
      "Keep a water bottle with you all day.",
      "Avoid sugary drinks; hydrate naturally.",
    ],
    goals: [
      "Drink 8 glasses of water",
      "Start the day with lemon water",
      "Limit caffeine intake",
    ],
  },
  Sleep: {
    tips: [
      "Stick to a regular sleep schedule.",
      "Avoid screens 1 hour before bed.",
      "Create a calm sleep environment.",
    ],
    goals: [
      "Get 7–9 hours of sleep",
      "No screens after 10 PM",
      "Wind down with reading or meditation",
    ],
  },
  Fitness: {
    tips: [
      "Stretch after waking up.",
      "Take stairs instead of elevator.",
      "Aim for 10,000 steps daily.",
    ],
    goals: [
      "Exercise for 30 minutes",
      "Do 10 push-ups or jumping jacks",
      "Take a walk after meals",
    ],
  },
  Mindfulness: {
    tips: [
      "Practice deep breathing for 5 minutes.",
      "Write in a gratitude journal.",
      "Spend time away from digital devices.",
    ],
    goals: [
      "5-minute meditation",
      "List 3 things you're grateful for",
      "Avoid social media in the morning",
    ],
  },
  Nutrition: {
    tips: [
      "Eat more whole foods than processed.",
      "Add veggies to every meal.",
      "Avoid eating late at night.",
    ],
    goals: [
      "Eat 3 servings of vegetables",
      "Have a fruit instead of a snack",
      "Avoid sugary drinks",
    ],
  },
};

const categories = Object.keys(wellnessData);

const WellnessProgram = () => {
  const [activeCategory, setActiveCategory] = useState("Hydration");
  const [completedGoals, setCompletedGoals] = useState([]);
  const [selectedTip, setSelectedTip] = useState(wellnessData["Hydration"].tips[0]);

  const getNewTip = () => {
    const tips = wellnessData[activeCategory].tips;
    let newTip;
    do {
      newTip = tips[Math.floor(Math.random() * tips.length)];
    } while (newTip === selectedTip);
    setSelectedTip(newTip);
  };

  const toggleGoal = (index) => {
    setCompletedGoals((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const currentGoals = wellnessData[activeCategory].goals;

  return (
    <div className="p-6 max-w-4xl mx-auto !bg-green-50 rounded-2xl shadow-md font-sans">
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
        🌿 Wellness Program
      </h2>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full border font-medium text-sm ${
              activeCategory === cat
                ? "!bg-green-600 text-white"
                : "!bg-white text-green-700 hover:!bg-green-100"
            } transition-all duration-200`}
            onClick={() => {
              setActiveCategory(cat);
              setSelectedTip(wellnessData[cat].tips[0]);
              setCompletedGoals([]);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tip of the Day */}
      <div className="!bg-white p-5 rounded-xl shadow mb-6 transition-all">
        <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
          🌟 {activeCategory} Tip of the Day
        </h3>
        <p className="text-gray-800 mt-3">{selectedTip}</p>
        <button
          onClick={getNewTip}
          className="mt-4 flex items-center gap-2 !bg-green-600 hover:!bg-green-700 text-white px-4 py-2 rounded-md"
        >
          <RefreshCcw size={18} /> New Tip
        </button>
      </div>

      {/* Daily Goals */}
      <div className="!bg-white p-5 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-green-700 mb-4">
          ✅ {activeCategory} Goals
        </h3>
        <ul className="space-y-3">
          {currentGoals.map((goal, index) => {
            const completed = completedGoals.includes(index);
            return (
              <li key={index} className="flex items-center">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={() => toggleGoal(index)}
                  className="mr-3 w-5 h-5 accent-green-600"
                />
                <span
                  className={`text-md ${
                    completed ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {goal}
                </span>
                {completed && <CheckCircle2 className="ml-2 text-green-600" size={20} />}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WellnessProgram;
