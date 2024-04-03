import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const emailValue = event.target.value;
    setEmail(emailValue);
    validateForm(emailValue, password);
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const passwordValue = event.target.value;
    setPassword(passwordValue);
    validateForm(email, passwordValue);
  }

  function validateForm(newEmail: string, newPassword: string) {
    const emailIsValid = /\S+@\S+\.\S+/.test(newEmail);
    const passwordIsValid = newPassword.length > 6;
    setFormValid(emailIsValid && passwordIsValid);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({ email }));
    navigate('/meals');
  }

  return (
    <div>
      <h2>Login</h2>
      <form data-testid="login-form" onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={ email }
            onChange={ handleEmailChange }
            data-testid="email-input"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={ password }
            onChange={ handlePasswordChange }
            data-testid="password-input"
          />
        </div>
        <button type="submit" disabled={ !formValid } data-testid="login-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
