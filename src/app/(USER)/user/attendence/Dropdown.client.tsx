"use client"; // This is important to mark this component as client-side

import { useState } from "react";

const Dropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={toggleDropdown}
        id="dropdownRadioButton"
        className="inline-flex items-center rounded-lg border border-gray-600 bg-gray-800 px-3 py-1.5 text-sm font-medium text-white hover:border-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-700"
        type="button"
      >
        <svg
          className="me-3 h-3 w-3 text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
        </svg>
        Last 30 days
        <svg
          className="ms-2.5 h-2.5 w-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isDropdownOpen && (
        <div
          id="dropdownRadio"
          className="z-10 w-48 divide-y divide-gray-600 rounded-lg bg-gray-700 shadow"
        >
          <ul className="space-y-1 p-3 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <div className="flex items-center rounded p-2 hover:bg-gray-600">
                <input
                  id="filter-radio-example-1"
                  type="radio"
                  value=""
                  name="filter-radio"
                  className="ring-offset-gray-800focus:ring-blue-600 h-4 w-4 border-gray-600 bg-gray-700 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-gray-800"
                />
                <label
                  htmlFor="filter-radio-example-1"
                  className="ms-2 w-full rounded text-sm font-medium text-gray-300"
                >
                  Last day
                </label>
              </div>
            </li>
            {/* Add more items for filtering */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
