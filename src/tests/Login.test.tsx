import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import Login from '../components/Login/Login';

describe('Login', () => {
  test('renders the login form', () => {
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    expect(getByTestId('login-submit-btn')).toBeInTheDocument();
    expect(getByLabelText('Email:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
  });
  test('updates email and password input fields', () => {
    const { getByLabelText, getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const VALID_EMAIL = 'test@example.com';
    const emailInput = getByLabelText('Email:');
    const passwordInput = getByLabelText('Password:');

    fireEvent.change(emailInput, { target: { value: VALID_EMAIL } });
    expect(emailInput).toHaveValue(VALID_EMAIL);

    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });
  test('login button is initially disabled', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );
    const loginButton = getByTestId('login-submit-btn');
    expect(loginButton).toBeDisabled();
  });

  // Adicionar mais teste
});
