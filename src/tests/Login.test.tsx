import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import Login from '../components/Login/Login';

// Definindo constantes para os testIds e valores reutilizados
const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';
const LOGIN_SUBMIT_BTN = 'login-submit-btn';
const VALID_EMAIL = 'test@example.com';
const VALID_PASSWORD = '1234567';

describe('Login Component', () => {
  it('renders the login form with email and password fields and a disabled submit button', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toBeInTheDocument();
    expect(getByTestId(LOGIN_SUBMIT_BTN)).toBeDisabled();
  });

  it('enables the submit button when a valid email and a password longer than 6 characters are entered', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId(EMAIL_INPUT), {
      target: { value: VALID_EMAIL },
    });
    fireEvent.change(getByTestId(PASSWORD_INPUT), {
      target: { value: VALID_PASSWORD },
    });

    expect(getByTestId(LOGIN_SUBMIT_BTN)).not.toBeDisabled();
  });

  it('navigates to /meals page on successful form submission', () => {
    // Simulando a página de destino para verificar a navegação
    function TestMealsPage() {
      return <div>Meals Page</div>;
    }

    const { getByTestId, queryByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/meals" element={ <TestMealsPage /> } />
        </Routes>
      </MemoryRouter>,
    );

    fireEvent.change(getByTestId(EMAIL_INPUT), {
      target: { value: VALID_EMAIL },
    });
    fireEvent.change(getByTestId(PASSWORD_INPUT), {
      target: { value: VALID_PASSWORD },
    });
    fireEvent.click(getByTestId(LOGIN_SUBMIT_BTN));

    // Verifica se a navegação foi bem-sucedida
    expect(queryByText('Meals Page')).toBeInTheDocument();
  });
});
