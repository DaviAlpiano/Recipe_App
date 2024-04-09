import { screen } from '@testing-library/dom';
import renderWithRouterContext from './renderwithcontext';
import App from '../App';

describe('Testando Recipes', () => {
  it('', () => {
    const { user } = renderWithRouterContext(<App />, { route: '/recipes' });

    const name = screen.getByRole('heading', { name: /abom/i });

    expect(name).toBeInTheDocument();
  });
});
