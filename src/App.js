// src/App.js
import React, { useState, useEffect } from 'react';
import { FacebookProvider, LoginButton } from 'react-facebook';
import axios from 'axios';

const App = () => {
    const [user, setUser] = useState(null);
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState('');
    const [insights, setInsights] = useState(null);
    const [since, setSince] = useState('');
    const [until, setUntil] = useState('');

    const handleResponse = async (data) => {
        const { accessToken, profile } = data;
        const userID = profile.id;
        try {
            const userRes = await axios.post('http://localhost:5000/api/login', { accessToken, userID });
            setUser(userRes.data);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const handleError = (error) => {
        console.error('Login error', error);
    };

    useEffect(() => {
        const fetchPages = async () => {
            if (user) {
                try {
                    const res = await axios.get(`http://localhost:5000/api/pages?userID=${user._id}`);
                    setPages(res.data);
                } catch (error) {
                    console.error('Fetch pages error', error);
                }
            }
        };
        fetchPages();
    }, [user]);

    const handlePageSelect = (event) => {
        setSelectedPage(event.target.value);
    };

    const fetchInsights = async () => {
        if (!selectedPage || !since || !until) {
            alert('Please select a page and date range.');
            return;
        }
        try {
            const res = await axios.get(`http://localhost:5000/api/insights`, {
                params: {
                    pageID: selectedPage,
                    userID: user._id,
                    since,
                    until,
                },
            });
            setInsights(res.data);
        } catch (error) {
            console.error('Fetch insights error', error);
        }
    };

    return (
        <div>
            <h1>Facebook Insights</h1>
            {!user ? (
                <FacebookProvider appId={process.env.FB_APP_ID}>
                    <LoginButton
                        scope="email"
                        onCompleted={handleResponse}
                        onError={handleError}
                    >
                        <span>Login via Facebook</span>
                    </LoginButton>
                </FacebookProvider>
            ) : (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <div>
                        <label htmlFor="pages">Select a Page:</label>
                        <select id="pages" onChange={handlePageSelect}>
                            <option value="">Select</option>
                            {pages.map(page => (
                                <option key={page.id} value={page.id}>{page.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="since">Since:</label>
                        <input
                            type="date"
                            id="since"
                            value={since}
                            onChange={(e) => setSince(e.target.value)}
                        />
                        <label htmlFor="until">Until:</label>
                        <input
                            type="date"
                            id="until"
                            value={until}
                            onChange={(e) => setUntil(e.target.value)}
                        />
                        <button onClick={fetchInsights}>Get Insights</button>
                    </div>
                    {insights && (
                        <div>
                            <h3>Page Insights</h3>
                            <div>Total Followers: {insights[0]?.values[0]?.value}</div>
                            <div>Total Engagement: {insights[1]?.values[0]?.value}</div>
                            <div>Total Impressions: {insights[2]?.values[0]?.value}</div>
                            <div>Total Reactions: {insights[3]?.values[0]?.value}</div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
