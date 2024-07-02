import React, { useState } from 'react';
import Login from './login';
import DateSelector from './dateSelector';
import Pages from './pages';
import Insights from './Insights';
import Profile from './profile';

function App() {
  const [user, setUser] = useState(null);
  const [pageID, setPageID] = useState('');
  const [dates, setDates] = useState({ since: '', until: '' });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <div className="w-full max-w-2xl p-4 bg-white rounded shadow-md">
          <Profile user={user} />
          <Pages user={user} onSelectPage={setPageID} />
          <DateSelector onDateChange={setDates} />
          {pageID && dates.since !== '' && dates.until !== '' && (
            <Insights user={user} pageID={pageID} since={dates.since} until={dates.until} />
          )}
        </div>
      )}
    </div>
  );
}

export default App;
