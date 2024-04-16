import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import renderWithRouterContext from './renderwithcontext';
import App from '../App';
import { dataRecipeDetailsDrinkMock, dataRecipeDetailsMock } from './Mock';

const rotaM = '/meals/52977';
const rotaD = '/drinks/17222';
const favoriteB = 'favorite-btn';
const whiteHearth = '/src/images/whiteHeartIcon.svg';
const blackHearth = '/src/images/blackHeartIcon.svg';

describe('Testando RecipeDetails', async () => {
  it('renderiza mensagem de loading inicialmente', () => {
    renderWithRouterContext(<App />, { route: rotaM });
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('testa mensagem de erro do fetch', async () => {
    const erroFetch = new Error('Erro ao buscar detalhes da receita');
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    vi.spyOn(global, 'fetch').mockRejectedValue(erroFetch);

    renderWithRouterContext(<App />, { route: rotaM });

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    expect(consoleSpy).toHaveBeenCalledWith('Erro ao buscar detalhes da receita:', expect.any(Error));

    vi.resetAllMocks();
  });

  it('renderiza os dados corretamente', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    renderWithRouterContext(<App />, { route: rotaM });

    const recipeTitle = await screen.findByTestId('recipe-title');
    expect(recipeTitle).toBeInTheDocument();

    const recipeCategory = screen.getByTestId('recipe-category');
    expect(recipeCategory).toBeInTheDocument();

    const instructions = screen.getByTestId('instructions');
    expect(instructions).toBeInTheDocument();

    const video = screen.getByTestId('video');
    expect(video).toBeInTheDocument();

    const ingredients = screen.getAllByTestId(/ingredient-name-and-measure/);
    expect(ingredients.length).toBe(13);

    const recipePhoto = screen.getByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByTestId(favoriteB);
    expect(favoriteBtn).toBeInTheDocument();

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();
  });

  it('renderiza o botão continue recipe se a receita de comida estiver no localStorage', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);
    const inProgress = {
      drinks: {
        17222: [],
      },
      meals: {
        52977: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    renderWithRouterContext(<App />, { route: rotaM });

    const buttonCon = await screen.findByRole('button', { name: /Continue Recipe/i });
    expect(buttonCon).toBeInTheDocument();
    vi.clearAllMocks();
  });

  it('renderiza o botão continue recipe se a receita de drink estiver no localStorage', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsDrinkMock,
    } as Response);
    const inProgress = {
      drinks: {
        17222: [],
      },
      meals: {
        52977: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));

    renderWithRouterContext(<App />, { route: rotaD });

    const drink = await screen.findByRole('heading', { name: /a1/i });

    expect(drink).toBeInTheDocument();

    const buttonCon = await screen.findByRole('button', { name: /Continue Recipe/i });
    expect(buttonCon).toBeInTheDocument();

    vi.clearAllMocks();
  });

  it('renderiza o botão de favoritar e ele é uma imagem de coraçao vazio e alterna pra cheio ao favoritar', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: rotaM });

    const buttonF = await screen.findByRole('button', { name: /favorite/i });

    expect(buttonF).toHaveAttribute('src', whiteHearth);

    await user.click(buttonF);

    expect(buttonF).toHaveAttribute('src', blackHearth);
  });

  it('renderiza o botão de favoritar e ele é uma imagem de coraçao vazio e alterna pra cheio ao favoritar, em Drinks', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: async () => dataRecipeDetailsDrinkMock,
    } as Response).mockResolvedValueOnce({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: rotaD });

    const buttonF = await screen.findByRole('button', { name: /favorite/i });

    expect(buttonF).toHaveAttribute('src', whiteHearth);

    await user.click(buttonF);

    expect(buttonF).toHaveAttribute('src', blackHearth);
  });

  it('renderiza o botão de favoritar e ele esta cheio se a comida estiver sido favoritada antes', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    const fav = [{
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));

    renderWithRouterContext(<App />, { route: rotaM });

    const buttonF = await screen.findByTestId(favoriteB);

    expect(buttonF).toBeInTheDocument();
    await new Promise((resolve) => { setTimeout(resolve, 1000); });
    expect(buttonF).toHaveAttribute('src', blackHearth);
  });

  it('renderiza o botão de share e copia o link da comida', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: rotaM });

    const buttonS = await screen.findByTestId('share-btn');

    await user.click(buttonS);

    const buttonC = await screen.findByText(/link copied!/i);

    expect(buttonC).toBeInTheDocument();

    await new Promise((resolve) => { setTimeout(resolve, 3000); });

    const buttonS2 = await screen.findByText(/share/i);

    expect(buttonS2).toBeInTheDocument();
  });

  it('renderiza o botão de favoritar e ele esta cheio se a comida estiver sido favoritada antes, ao clicar fica vazio', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataRecipeDetailsMock,
    } as Response);

    const fav = [{
      id: '52977',
      type: 'meal',
      nationality: 'Turkish',
      category: 'Side',
      alcoholicOrNot: '',
      name: 'Corba',
      image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(fav));

    const { user } = renderWithRouterContext(<App />, { route: rotaM });

    const buttonF = await screen.findByTestId(favoriteB);

    expect(buttonF).toBeInTheDocument();

    await new Promise((resolve) => { setTimeout(resolve, 1000); });

    expect(buttonF).toHaveAttribute('src', blackHearth);

    await user.click(buttonF);

    expect(buttonF).toHaveAttribute('src', whiteHearth);
  });
});
