import { render } from '@testing-library/react';

const renderWithContext = (ui:  JSX.Element) => {
    return{
    ...render(
        ui
    )
    }
}

export default renderWithContext;