import React, { useState } from "react";
//import { requestForToken, onMessageListener } from "./firebase";

const MedicineReminder = () => {
  const [reminders, setReminders] = useState([]);

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
    }
  };
  const addReminder = () => {
    const time = prompt("Enter reminder time (e.g., 9:00 AM)");
    const medicine = prompt("Enter medicine name");
    if (time && medicine) {
      const reminderTime = new Date();
      const [hours, minutes] = time.split(":").map(Number);
      reminderTime.setHours(hours, minutes, 0);

      const delay = reminderTime - new Date();

      if (delay > 0 && Notification.permission === "granted") {
        setTimeout(() => {
          new Notification("Medicine Reminder", {
            body: `Time to take: ${medicine}`,
            icon: "https://cdn-icons-png.flaticon.com/512/2981/2981323.png", // Optional icon
          });
        }, delay);
      }
      setReminders([...reminders, { time, medicine }]);
    }
  };

  return (
    <div className="p-4 bg-yellow-100 rounded-lg">
      <h2 className="text-xl font-bold">Medicine Reminder</h2>
      <button onClick={requestNotificationPermission} className="bg-blue-500 text-white p-1 rounded">
        Enable Notifications
      </button>
      <button onClick={addReminder} className="bg-yellow-500 text-white p-1 rounded">
        Add Reminder
      </button>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>
            {reminder.medicine} - {reminder.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineReminder;
