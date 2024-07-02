import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pages({ user, onSelectPage }) {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (!user || !user._id) return; // Ensure user and user ID are available

    let isMounted = true;

    const fetchPages = async () => {
      try {
        console.log('Request initiated');
        const response = await axios.get('http://localhost:5000/api/pages', { params: { userID: user._id } });
        console.log('Request completed');
        if (isMounted) {
          setPages(response.data);
        }
      } catch (error) {
        console.error('Error fetching pages:', error);
      }
    };

    fetchPages();

    return () => {
      isMounted = false; // Cleanup to set isMounted to false
    };
  }, [user._id]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Select a Page</h2>
      <select
        onChange={(e) => onSelectPage(e.target.value)}
        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
      >
        <option value="">Select a page</option>
        {pages.map((page) => (
          <option key={page.id} value={page.id}>{page.name}</option>
        ))}
      </select>
    </div>
  );
}

export default Pages;
