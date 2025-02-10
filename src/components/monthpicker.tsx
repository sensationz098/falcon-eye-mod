"use client";
import { useState } from "react";

const MonthPicker = () => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    new Date().getMonth() - 1,
  );

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="month-picker">
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(Number(e.target.value))}
        className="rounded-md bg-gray-700 p-2 text-white"
      >
        {months.map((month, index) => (
          <option key={index} value={index + 1}>
            {month}
          </option>
        ))}
      </select>

      <p>{selectedMonth}</p>
    </div>
  );
};

export default MonthPicker;
