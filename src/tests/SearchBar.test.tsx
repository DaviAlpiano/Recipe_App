import { screen } from '@testing-library/dom';
import { vi } from 'vitest';
import App from '../App';
import renderWithRouterContext from './renderwithcontext';
import { dataChickenMock, dataSearchMock } from './Mock';

describe('Testando se a SearchBar funciona como o esperado.', async () => {
  it('SearchBar aparece quando clicado no botão de deixar ela visivel.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/meals' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    const textarea = screen.queryByRole('textbox');

    expect(buttonVisible).toBeInTheDocument();
    expect(textarea).not.toBeInTheDocument();

    await user.click(buttonVisible);

    const textarea2 = screen.queryByRole('textbox');
    expect(textarea2).toBeInTheDocument();
    vi.clearAllMocks();
  });

  it('É encontrado os inputs esperados além da barra.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/meals' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const ingredient = screen.getByText(/ingredient/i);
    const name = screen.getByText(/name/i);
    const fLetter = screen.getByText(/first letter/i);

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(fLetter).toBeInTheDocument();
    vi.clearAllMocks();
  });

  it('É esperado que a rota seja mudada ao retornar um elemento na pesquisa.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/meals' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const name = screen.getByText(/name/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'Arrabiata');
    await user.click(name);
    await user.click(buttonSearch);

    const { pathname } = global.window.location;

    expect(pathname).toBe('/meals/52771');
    vi.clearAllMocks();
  });

  it('É esperado que a rota seja mudada ao retornar um elemento na pesquisa utilizando drinks.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/drinks' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const name = screen.getByText(/name/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'Aquamarine');
    await user.click(name);
    await user.click(buttonSearch);

    const { pathname } = global.window.location;

    expect(pathname).toBe('/drinks/178319');
    vi.clearAllMocks();
  });

  it('É esperado que apareça um alert ao digiar mais de 1 caractere na opçao first letter.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {});

    const { user } = renderWithRouterContext(<App />, { route: '/drinks' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const fLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'aa');
    await user.click(fLetter);
    await user.click(buttonSearch);

    expect(alertSpy).toHaveBeenCalled();
    vi.clearAllMocks();
  });

  it('É esperado que se faça o fetch no endpoint certo para primeira letra.', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/drinks' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const fLetter = screen.getByText(/first letter/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'A');
    await user.click(fLetter);
    await user.click(buttonSearch);

    expect(fetchSpy).toHaveBeenCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=A');
    vi.clearAllMocks();
  });

  it('É esperado que se faça o fetch no endpoint certo para ingredients.', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataChickenMock,
    } as Response);

    const { user } = renderWithRouterContext(<App />, { route: '/meals' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const ingredient = screen.getByText(/ingredient/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'chicken');
    await user.click(ingredient);
    await user.click(buttonSearch);

    expect(fetchSpy).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
    vi.clearAllMocks();
  });

  it('É esperado que apareça um alert ao digiar um item que nao tenha.', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => dataSearchMock,
    } as Response);

    const alertSpy = vi.spyOn(window, 'alert');

    const { user } = renderWithRouterContext(<App />, { route: '/meals' });

    const buttonVisible = screen.getByRole('img', { name: /search icon/i });

    await user.click(buttonVisible);

    const textarea = screen.getByRole('textbox');
    const name = screen.getByText(/name/i);
    const buttonSearch = screen.getByText(/search/i);

    await user.type(textarea, 'chicken');
    await user.click(name);
    await user.click(buttonSearch);
    await user.type(textarea, 'Aquamarine');
    await user.click(buttonSearch);

    expect(alertSpy).toHaveBeenCalled();
    vi.clearAllMocks();
  });
});
