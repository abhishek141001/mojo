import React, { useState } from 'react';

function DateSelector({ onDateChange }) {
  const [dates, setDates] = useState({ since: '', until: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDates({ ...dates, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateChange(dates);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
      <div className="mb-2">
        <label className="block mb-1">Since:</label>
        <input
          type="date"
          name="since"
          value={dates.since}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div className="mb-2">
        <label className="block mb-1">Until:</label>
        <input
          type="date"
          name="until"
          value={dates.until}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Submit</button>
    </form>
  );
}

export default DateSelector;
