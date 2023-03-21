import React, { useState } from "react";
import "./Login.css"; // import CSS file for styling
import { Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [reenterEmail, setReenterEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [termsError, setTermsError] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  function handleReenterEmailBlur() {
    // Check if re-entered email is empty
    if (reenterEmail.trim() === "") {
      setEmailError("Esse campo é obrigatório");
    }
    // Check if re-entered email is not the same as email
    else if (email !== reenterEmail) {
      setEmailError("Os dois e-mails devem ser iguais.");
    } else {
      setEmailError("");
    }
  }

  function handlePasswordBlur() {}

  function handleEmailBlur() {
    if (email.trim() === "") {
      setEmailError("Esse campo é obrigatório");
    } else {
      setEmailError("");
    }
  }

  function handleCheckboxChange() {
    if (!termsChecked) {
      setTermsError("(Esse campo é obrigatório)");
    } else {
      setTermsError("");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const errors = [];

    if (email.trim() === "") {
      setEmailError("Esse campo é obrigatório");
      errors.push("Email is mandatory");
    }

    if (reenterEmail.trim() === "") {
      setEmailError("Esse campo é obrigatório");
      errors.push("Re-enter email is mandatory");
    }

    if (email !== reenterEmail) {
      setEmailError("The two emails must be the same");
      errors.push("The two emails must be the same");
    }

    const passwordRegex = /^(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number"
      );
      errors.push(
        "Password must be at least 8 characters long and contain at least one number"
      );
    }

    if (!termsChecked) {
      setTermsError("You must accept the terms and conditions");
      errors.push("You must accept the terms and conditions");
    }

    setFormErrors(errors);
  }

  return (
    <div>
      <div className="logo">
        <img
          src="https://dashboard.kiwify.com.br/_nuxt/img/kiwify-green-logo.2af0e50.png"
          alt="Logo"
        />
      </div>
      <div className="header-heading">
        <h2>Criar nova conta</h2>
        <h3>
          Ou,{" "}
          <Link className="sign-up-link">entrar na sua conta existente</Link>
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
            <label htmlFor="reenter-email">Repetir e-mail</label>
            <input
              type="email"
              id="reenter-email"
              placeholder="Re-enter your email"
              value={reenterEmail}
              onChange={(event) => setReenterEmail(event.target.value)}
              onBlur={handleReenterEmailBlur}
              className={
                emailError &&
                (email !== reenterEmail || reenterEmail.trim() === "")
                  ? "input-error"
                  : ""
              }
            />
            {emailError &&
              (email !== reenterEmail || reenterEmail.trim() === "") && (
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
          <div className="form-group">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="terms"
                checked={termsChecked}
                onChange={(event) => setTermsChecked(event.target.checked)}
                onBlur={handleCheckboxChange}
              />
              <label htmlFor="terms">
                Eu li e aceito os <a> termos de uso </a>,{" "}
                <a> termos de licença de uso de software </a>,{" "}
                <a>política de conteúdo </a> da Kiwify
              </label>
            </div>
            {termsError && !termsChecked && (
              <small className="error">{termsError}</small>
            )}
          </div>
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
