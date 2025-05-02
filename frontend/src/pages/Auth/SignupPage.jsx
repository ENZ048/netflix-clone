import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useAuthStore } from "../../store/authUser";

export default function LoginPage() {
  const {searchParams} = new URL(document.location);
  const emailValue = searchParams.get('email');
  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {signup} = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    signup({email, username, password});
  };

  return (
    <div className="auth-hero">
      <header className="auth-header">
        <Link to={"/"}>
          <img src="/netflix-logo.png" alt="Netflix Logo" className="logo" />
        </Link>
      </header>

      <div className="form-container">
        <div className="form-box">
          <h1 className="title">SignUp</h1>

          <form className="form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Example123"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-button">Signup</button>

            <div className="link">
              Already have an account?{" "}
              <Link to={"/login"} className="highlight-link">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
