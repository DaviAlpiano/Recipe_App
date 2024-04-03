import { useContext, useState } from 'react';
import APIConxtet from '../Context/ContextAPI/APIContext';
import { InfoSearchBar } from '../../types';

function SearchBar() {
  const { searchOption } = useContext(APIConxtet);
  const [info, setInfo] = useState<InfoSearchBar>({});

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    const valor = e.currentTarget.value;
    const { name } = e.currentTarget;
    setInfo({ ...info, [name]: valor });
  }

  function handleButton() {
    if (info.text.length > 1 && info.pesquisa === 'first-letter') {
      return window.alert('Your search must have only 1 (one) character');
    }
    searchOption(info);
  }
  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="text"
        id="text"
        onChange={ handleChange }
      />
      <input
        type="radio"
        name="pesquisa"
        id="ingredient"
        value="ingredient"
        data-testid="ingredient-search-radio"
        onChange={ handleChange }
      />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        type="radio"
        name="pesquisa"
        id="name"
        value="name"
        data-testid="name-search-radio"
        onChange={ handleChange }
      />
      <label htmlFor="name">Name</label>
      <input
        type="radio"
        name="pesquisa"
        id="first-letter"
        value="first-letter"
        data-testid="first-letter-search-radio"
        onChange={ handleChange }
      />
      <label htmlFor="first-letter">First Letter</label>
      <button
        data-testid="exec-search-btn"
        onClick={ handleButton }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
