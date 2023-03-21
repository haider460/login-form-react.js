import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // import CSS file for styling

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailBlur = () => {
    const newErrors = [];
    if (!email) {
      newErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push("Email is invalid");
    }
    setEmailError(newErrors[0]);
    setErrors(newErrors);
  };

  const handlePasswordBlur = () => {
    const newErrors = [];
    if (!password) {
      newErrors.push("Password is required");
    }
    setPasswordError(newErrors[0]);
    setErrors(newErrors);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = [];

    // validate email
    if (!email) {
      newErrors.push("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.push("Email is invalid");
    }

    // validate password
    if (!password) {
      newErrors.push("Password is required");
    }

    // display errors
    setEmailError(newErrors.find((error) => error.includes("Email")));
    setPasswordError(newErrors.find((error) => error.includes("Password")));
    setErrors(newErrors);

    // submit form if no errors
    if (newErrors.length === 0) {
      // handle form submission
    } else {
      // show error message for each empty field
      if (!email) {
        setEmailError("Esse campo é obrigatório");
      }
      if (!password) {
        setPasswordError("Esse campo é obrigatório");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="https://dashboard.kiwify.com.br/_nuxt/img/kiwify-green-logo.2af0e50.png"
          alt="Logo"
        />
      </div>
      <div className="header-heading">
        <h1>Entrar na sua conta</h1>
        <h3>
          Ou,{" "}
          <Link to="/signup" className="sign-up-link">
            fazer cadastro
          </Link>
        </h3>
      </div>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              onBlur={handleEmailBlur}
              className={emailError && email.trim() === "" ? "input-error" : ""}
            />
            {emailError && email.trim() === "" && (
              <small className="error">{emailError}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onBlur={handlePasswordBlur}
              className={passwordError && !password ? "input-error" : ""}
            />
            {passwordError && !password && (
              <small className="error">{passwordError}</small>
            )}
          </div>
          <div className="signup-link">
            <Link>Esqueceu a senha?</Link>
          </div>
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
