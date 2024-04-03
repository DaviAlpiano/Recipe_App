import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  // Obtém a função de navegação do React Router
  const navigate = useNavigate();
  // Define os estados para o email, senha e validade do formulário
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formValid, setFormValid] = useState(false);

  // Função para lidar com a mudança no campo de email
  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    const emailValue = event.target.value;
    // Atualiza o estado do email
    setEmail(emailValue);
    // Valida o formulário com o novo valor do email e a senha atual
    validateForm(emailValue, password);
  }

  // Função para lidar com a mudança no campo de senha
  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const passwordValue = event.target.value;
    // Atualiza o estado da senha
    setPassword(passwordValue);
    // Valida o formulário com o email atual e o novo valor da senha
    validateForm(email, passwordValue);
  }

  // Função para validar o formulário com base no email e senha fornecidos
  function validateForm(newEmail: string, newPassword: string) {
    // Verifica se o email é válido
    const emailIsValid = /\S+@\S+\.\S+/.test(newEmail);
    // Verifica se a senha tem mais de 6 caracteres
    const passwordIsValid = newPassword.length > 6;
    // Define a validade do formulário com base nos resultados das verificações
    setFormValid(emailIsValid && passwordIsValid);
  }

  // Função para lidar com a submissão do formulário
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Impede o comportamento padrão do formulário de recarregar a página
    event.preventDefault();
    // Salva o email do usuário no localStorage
    localStorage.setItem('user', JSON.stringify({ email }));
    // Navega para a página de refeições após o login bem-sucedido
    navigate('/meals');
  }

  return (
    <div>
      {/* Título da página de login */}
      <h2>Login</h2>
      {/* Formulário de login */}
      <form data-testid="login-form" onSubmit={ handleSubmit }>
        {/* Campo de entrada de email */}
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
        {/* Campo de entrada de senha */}
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
        {/* Botão de submissão do formulário de login */}
        <button type="submit" disabled={ !formValid } data-testid="login-submit-btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
