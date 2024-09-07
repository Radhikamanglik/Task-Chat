import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const signup = async () => {
    try {
      const res = await axios.post(`${API_URL}/signup`, { username, password });
      setMessage(res.data.message);
      setError("");
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
    }
  };

  const login = async () => {
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      setToken(res.data.token);
      setMessage("Logged in");
      setError("");
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  const accessChat = async () => {
    try {
      const res = await axios.get(`${API_URL}/chat`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChatMessage(res.data.message);
      setError("");
    } catch (error) {
      setError("Access denied. Please login.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Basic Chat with JWT Authentication</h2>

      <div>
        <h3>Signup</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signup}>Signup</button>
      </div>

      <div>
        <h3>Login</h3>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </div>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <h3>Chat Window</h3>
        <button onClick={accessChat}>Access Chat</button>
        {chatMessage && <p>{chatMessage}</p>}
      </div>
    </div>
  );
}

export default App;
