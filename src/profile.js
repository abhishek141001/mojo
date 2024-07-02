import React from 'react';

function Profile({ user }) {
  return (
    <div className="flex items-center p-4 border-b border-gray-200">
      <img src={`https://graph.facebook.com/${user.facebookId}/picture?type=large`} alt="Profile" className="w-16 h-16 rounded-full mr-4" />
      <h2 className="text-xl font-semibold">Welcome, {user.name}</h2>
    </div>
  );
}

export default Profile;
