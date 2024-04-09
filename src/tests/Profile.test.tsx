import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../components/Profile/Profile';

describe('Profile component', () => {
  beforeEach(() => {
    localStorage.setItem('user', 'test@example.com');
  });

  afterEach(() => {
    localStorage.clear();
  });

  test('renders user email', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const emailElement = screen.getByTestId('profile-email');
    expect(emailElement).toBeInTheDocument();
    expect(emailElement.textContent).toBe('test@example.com');
  });

  test('redirects to done recipes page', () => {
    const { container } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const doneRecipesButton = container.querySelector('[data-testid="profile-done-btn"]');
    if (doneRecipesButton) {
      fireEvent.click(doneRecipesButton);

      fireEvent.click(doneRecipesButton);
    }

    expect(window.location.pathname).toBe('/done-recipes');
  });

  test('redirects to favorite recipes page', () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const favoriteRecipesButton = screen.getByTestId('profile-favorite-btn');
    fireEvent.click(favoriteRecipesButton);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  test('clears localStorage and redirects to login page on logout', () => {
    const { container } = render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>,
    );

    const logoutButton = container.querySelector('[data-testid="profile-logout-btn"]');
    if (logoutButton) {
      fireEvent.click(logoutButton);
    }

    expect(localStorage.getItem('user')).toBeNull();
    expect(window.location.pathname).toBe('/');
  });
});
