import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Header from '../components/Header/Header';

const PROFILE_BTN_TEST_ID = 'profile-top-btn';
const SEARCH_BTN_TEST_ID = 'search-top-btn';
const SEARCH_INPUT_TEST_ID = 'search-input';
const PAGE_TITLE_TEST_ID = 'page-title';

const mockedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actualModule = await vi.importActual('react-router-dom') as { [key: string]: any };
  return {
    ...actualModule,
    useNavigate: () => mockedNavigate,
  };
});

describe('Header Component Coverage', () => {
  const renderHeaderWithPath = (path: string) => {
    window.history.pushState({}, 'Test page', path);
    render(
      <MemoryRouter initialEntries={ [path] }>
        <Routes>
          <Route path={ path } element={ <Header /> } />
        </Routes>
      </MemoryRouter>,
    );
  };

  it.each([
    ['/meals', 'Meals'],
    ['/drinks', 'Drinks'],
    ['/profile', 'Profile'],
    ['/done-recipes', 'Done Recipes'],
    ['/favorite-recipes', 'Favorite Recipes'],
    // Adicione outras rotas e títulos conforme necessário
  ])('deve renderizar o título "%s" na rota "%s"', (path, expectedTitle) => {
    renderHeaderWithPath(path);
    expect(screen.getByTestId(PAGE_TITLE_TEST_ID)).toHaveTextContent(expectedTitle);
  });

  it.each([
    '/profile',
    '/done-recipes',
    '/favorite-recipes',
  ])('não deve mostrar o ícone de busca na rota "%s"', (path) => {
    renderHeaderWithPath(path);
    const searchBtn = screen.queryByTestId(SEARCH_BTN_TEST_ID);
    expect(searchBtn).toBeNull();
  });

  it.each([
    '/meals',
    '/drinks',
  ])('deve mostrar o ícone de busca na rota "%s"', (path) => {
    renderHeaderWithPath(path);
    const searchBtn = screen.getByTestId(SEARCH_BTN_TEST_ID);
    expect(searchBtn).toBeInTheDocument();

    fireEvent.click(searchBtn);
    expect(screen.getByTestId(SEARCH_INPUT_TEST_ID)).toBeInTheDocument();
    fireEvent.click(searchBtn);
    expect(screen.queryByTestId(SEARCH_INPUT_TEST_ID)).toBeNull();
  });

  it('deve redirecionar para a tela de perfil ao clicar no ícone de perfil', () => {
    renderHeaderWithPath('/');
    fireEvent.click(screen.getByTestId(PROFILE_BTN_TEST_ID));
    expect(mockedNavigate).toHaveBeenCalledWith('/profile');
  });
});
