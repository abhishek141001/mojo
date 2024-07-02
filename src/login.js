import React from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from 'axios';

function Login({ onLogin }) {
  async function handleResponse (data){
    // Extracting accessToken and userID from the Facebook response
    console.log('data',data)
    localStorage.setItem("fbAccess_Token", data.authResponse.accessToken);
    localStorage.setItem("fbUser", data.authResponse.userID);
    let accessToken = data.authResponse.accessToken;
    let userID = data.authResponse.userID;

    // Sending tokens to the server
    try {
      const response = await axios.post('http://localhost:5000/api/login', { accessToken, userID });
      onLogin(response.data);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleError = (error) => {
    console.error('error occurred', error);
  };

  return (
    <FacebookProvider appId='1190609985281435'>
      <div className="flex flex-col items-center">
        <LoginButton
          scope="email,public_profile,pages_show_list,read_insights,pages_read_engagement"
          onSuccess={handleResponse}
          onError={handleError}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <span>Login via Facebook</span>
        </LoginButton>
      </div>
    </FacebookProvider>
  );
}

export default Login;
