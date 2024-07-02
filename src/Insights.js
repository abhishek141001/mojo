import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Insights({ user, pageID, since, until }) {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/insights', {
          params: { pageID, userID: user._id, since, until }
        });
        console.log('Response:', response.data);
        setInsights(response.data);
      } catch (error) {
        console.error('Error fetching insights:', error);
      }
    };

    if (pageID && since && until) {
      fetchInsights();
    }
  }, [pageID, user._id, since, until]);

  if (!insights) {
    return <div className="p-4">No data available</div>;
  }

  return (
    <div className="p-4 border-t border-gray-200">
      <h2 className="text-lg font-semibold mb-4">Page Insights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-md font-semibold mb-2">Total Followers</h3>
          <p className="text-xl">{insights.page_follows}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-md font-semibold mb-2">Total Impressions</h3>
          <p className="text-xl">{insights.page_impressions}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-md font-semibold mb-2">Post Reactions</h3>
          <p className="text-xl">{insights.post_reactions_by_type_total}</p>
        </div>
        <div className="p-4 bg-white shadow rounded">
          <h3 className="text-md font-semibold mb-2">Post Engaged Users</h3>
          <p className="text-xl">{insights.post_engaged_users}</p>
        </div>
      </div>
    </div>
  );
}

export default Insights;
