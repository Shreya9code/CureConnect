import React, { useState }  from "react";

const WellnessProgram = () => {
  const wellnessTips = [
    "Stay hydrated and drink at least 8 glasses of water daily.",
    "Exercise for at least 30 minutes a day.",
    "Get 7-9 hours of quality sleep every night.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Take regular breaks to reduce stress and improve focus.",
  ];

  const [completedGoals, setCompletedGoals] = useState([]);
  const [selectedTip, setSelectedTip] = useState(wellnessTips[0]);

  const toggleGoalCompletion = (index) => {
    setCompletedGoals((prev) =>
      prev.includes(index)
        ? prev.filter((goal) => goal !== index)
        : [...prev, index]
    );
  };

  const getNewTip = () => {
    const newTip =
      wellnessTips[Math.floor(Math.random() * wellnessTips.length)];
    setSelectedTip(newTip);
  };

  return (
    <div className="p-4 bg-green-100 rounded-lg">
      <h2 className="text-xl font-bold">Wellness Program</h2>
      <p>Improve your health with personalized wellness plans.</p>
      {/* Wellness Tip of the Day */ }
      <div className="bg-white p-4 rounded-md shadow-md mb-4">
        <h3 className="text-lg font-semibold text-green-700">
          Tip of the Day 🌟
        </h3>
        <p className="text-gray-700 mt-2">{selectedTip}</p>
        <button
          onClick={getNewTip}
          className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          New Tip
        </button>
      </div>

      {/* Daily Goals Checklist */ }
      <div className="bg-white p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold text-green-700">
          ✅ Daily Wellness Goals
        </h3>
        <ul className="mt-2">
          {[
            "Drink 8 glasses of water",
            "Exercise for 30 minutes",
            "Get enough sleep",
          ].map((goal, index) => (
            <li key={index} className="flex items-center mt-2">
              <input
                type="checkbox"
                checked={completedGoals.includes(index)}
                onChange={() => toggleGoalCompletion(index)}
                className="mr-2 w-5 h-5"
              />
              <span
                className={
                  completedGoals.includes(index)
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }
              >
                {goal}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WellnessProgram;