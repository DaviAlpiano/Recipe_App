import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DoneRecipes from '../components/DoneRecipes/DoneRecipes';

const doneRecipeDate = '23/06/2020';
const doneRecipesMock = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: doneRecipeDate,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: '',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

const doneRecipeName = 'Spicy Arrabiata Penne';
const horizontalNameTestId = '0-horizontal-name';

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });

  localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesMock));

  render(
    <MemoryRouter>
      <DoneRecipes />
    </MemoryRouter>,
  );
});

afterEach(() => {
  localStorage.removeItem('doneRecipes');
  vi.restoreAllMocks();
});

describe('DoneRecipes Page Tests', () => {
  it('renders the filters and the first done recipe card correctly', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian - Vegetarian');
    expect(screen.getByTestId(horizontalNameTestId)).toHaveTextContent(doneRecipeName);
    expect(screen.getByTestId('0-horizontal-done-date')).toHaveTextContent(doneRecipeDate);
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toHaveTextContent('Pasta');
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toHaveTextContent('Curry');
  });

  it('filters recipes by meal when the "Meal" button is clicked', () => {
    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(horizontalNameTestId)).toHaveTextContent(doneRecipeName);
    expect(screen.queryByTestId(`${1}-horizontal-name`)).toBeNull();
  });

  it('filters recipes by drink when the "Drink" button is clicked', () => {
    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId(horizontalNameTestId)).toHaveTextContent('Aquamarine');
    expect(screen.queryByTestId(`${1}-horizontal-name`)).toBeNull();
  });

  it('shows all recipes when the "All" button is clicked', () => {
    fireEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getByTestId(horizontalNameTestId)).toHaveTextContent(doneRecipeName);
    expect(screen.getByTestId(`${1}-horizontal-name`)).toHaveTextContent('Aquamarine');
  });

  it('mostra a mensagem "Link copied!" após clicar no botão de compartilhar', async () => {
    fireEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    await waitFor(() => expect(screen.queryByText('Link copied!')).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(expect.stringContaining('http://localhost:3000/meals/52771'));
  });
});
