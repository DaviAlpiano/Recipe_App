import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import APIProvider from '../components/Context/ContextAPI/APIProvider';

const renderWithRouterContext = (ui: JSX.Element, { route = '/' } = {}) => {
  window.history.pushState({}, '', route);

  return {
    user: userEvent.setup(),
    ...render(
      <APIProvider>
        {ui}
        {/* <BrowserRouter>
        {ui}
        </BrowserRouter> */}
      </APIProvider>,
    ),
  };
};

export default renderWithRouterContext;
