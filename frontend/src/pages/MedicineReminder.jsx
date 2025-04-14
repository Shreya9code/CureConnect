import React, { useState, useEffect } from "react";

const MedicineReminder = () => {
  const [reminders, setReminders] = useState([]);
  const [time, setTime] = useState("");
  const [medicine, setMedicine] = useState("");

  const requestNotificationPermission = async () => {
    if ("Notification" in window) {
      if (Notification.permission !== "granted") {
        await Notification.requestPermission();
      }
    }
  };

  const addReminder = () => {
    if (!time || !medicine) {
      alert("Please select a time and enter medicine name.");
      return;
    }

    const reminderTime = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    reminderTime.setHours(hours, minutes, 0);

    const delay = reminderTime - new Date();

    if (delay > 0 && Notification.permission === "granted") {
      const timeoutId = setTimeout(() => {
        new Notification("Medicine Reminder", {
          body: `Time to take: ${medicine}`,
          icon: "https://cdn-icons-png.flaticon.com/512/2981/2981323.png",
        });
      }, delay);

      // Adding timeoutId with the reminder
      setReminders([...reminders, { time, medicine, timeoutId }]);
    }

    setTime("");
    setMedicine("");
  };

  const deleteReminder = (index) => {
    // Get the reminder to be deleted
    const reminderToDelete = reminders[index];

    // Clear the timeout to prevent the notification from firing
    clearTimeout(reminderToDelete.timeoutId);

    // Remove the reminder from the state
    setReminders(reminders.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 !bg-yellow-100 rounded-lg">
      <h2 className="text-xl font-bold">Medicine Reminder</h2>
      
      <button onClick={requestNotificationPermission} className="!bg-blue-500 text-white p-1 rounded">
        Enable Notifications
      </button>

      <div className="mt-2">
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="border p-1 rounded"
        />
        <input
          type="text"
          placeholder="Enter medicine name"
          value={medicine}
          onChange={(e) => setMedicine(e.target.value)}
          className="border p-1 rounded ml-2"
        />
        <button onClick={addReminder} className="!bg-yellow-500 text-white p-1 rounded ml-2">
          Add Reminder
        </button>
      </div>

      <ul className="mt-2">
        {reminders.map((reminder, index) => (
          <li key={index} className="flex items-center justify-between p-2 bg-white rounded shadow mt-1">
            {reminder.medicine} - {reminder.time}
            <button onClick={() => deleteReminder(index)} className="text-red-500 ml-2">
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicineReminder;
