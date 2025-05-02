import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";
import { useAuthStore } from "../../store/authUser";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({email, password});
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
          <h1 className="title">Login</h1>

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

            <button>Login</button>

            <div className="link">
              Don't have an account?{" "}
              <Link to={"/signup"} className="highlight-link">
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
