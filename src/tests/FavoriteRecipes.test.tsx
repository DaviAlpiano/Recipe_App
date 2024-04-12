import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoriteRecipes from '../components/FavoriteRecipes/FavoriteRecipes';

// Define constants for any strings used multiple times
const LINK_COPIED_MESSAGE = 'Link copied!';
const RECIPE_IMAGE_SRC = 'https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg';
const SHARE_BUTTON_TEST_ID = '0-horizontal-share-btn';
const A = '0-horizontal-top-text';

// Mock data for favorite recipes
const favoriteRecipesMock = [
  {
    id: '52977',
    type: 'meal',
    nationality: 'Italian',
    category: 'Pasta',
    alcoholicOrNot: '',
    name: 'Spaghetti Carbonara',
    image: RECIPE_IMAGE_SRC,
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Italian'],
  },
  {
    id: '15997',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Margarita',
    image: 'https://www.thecocktaildb.com/images/media/drink/wpxpvu1439905379.jpg',
    doneDate: '22/06/2020',
    tags: ['Sour', 'Alcohol'],
  },
];

beforeEach(() => {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText: vi.fn().mockResolvedValue(undefined) },
    writable: true,
    configurable: true,
  });

  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipesMock));
  render(
    <MemoryRouter>
      <FavoriteRecipes />
    </MemoryRouter>,
  );
});

afterEach(() => {
  localStorage.removeItem('favoriteRecipes');
  vi.restoreAllMocks();
});

describe('FavoriteRecipes Page Tests', () => {
  it('renders the filters and the first favorite recipe card correctly', () => {
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-image')).toHaveAttribute('src', favoriteRecipesMock[0].image);
    expect(screen.getByTestId(A)).toHaveTextContent(`${favoriteRecipesMock[0].nationality} - ${favoriteRecipesMock[0].category}`);
    expect(screen.getByTestId('0-horizontal-name')).toHaveTextContent(favoriteRecipesMock[0].name);
    expect(screen.getByTestId(SHARE_BUTTON_TEST_ID)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
  });

  it('filters recipes by meal when the "Meals" filter button is clicked', async () => {
    fireEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId(A)).toHaveTextContent('Italian - Pasta');
  });

  it('filters recipes by drink when the "Drinks" filter button is clicked', async () => {
    fireEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId(A)).toHaveTextContent('Alcoholic - Cocktail');
  });

  it('shows all recipes when the "All" filter button is clicked', async () => {
    fireEvent.click(screen.getByTestId('filter-by-all-btn'));
    expect(screen.getAllByTestId(/-horizontal-name/)).toHaveLength(favoriteRecipesMock.length);
  });

  it('Clicking the "unfavorite" button removes the respective recipe from the screen', async () => {
    expect(screen.getByText(favoriteRecipesMock[1].name)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('1-horizontal-favorite-btn'));
    expect(screen.getByText(favoriteRecipesMock[0].name)).toBeInTheDocument();
    expect(screen.queryByText(favoriteRecipesMock[1].name)).toBeNull();

    fireEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(screen.queryByText(favoriteRecipesMock[0].name)).toBeNull();
    expect(screen.queryByText(favoriteRecipesMock[1].name)).toBeNull();
  });

  it('shows the "Link copied!" message after clicking the share button', async () => {
    fireEvent.click(screen.getByTestId(SHARE_BUTTON_TEST_ID));
    await waitFor(() => expect(screen.getByText(LINK_COPIED_MESSAGE)).toBeInTheDocument());
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`http://localhost:3000/meals/${favoriteRecipesMock[0].id}`);
  });
});
