import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import APIContext from '../Context/ContextAPI/APIContext';
import { InfoSearchBar, Meal, Drink } from '../types';

type APIContextWithText = {
  searchOption: (search: InfoSearchBar) => void;
  foods: (Meal | Drink)[] | null;
  text: string;
};

function SearchBar() {
  const { searchOption, foods, text } = useContext(APIContext) as APIContextWithText;
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoSearchBar>({
    pesquisa: '',
    text,
    url: '',
  });
  const { pathname } = useLocation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setInfo({ ...info, [name]: value, url: pathname });
  }

  useEffect(() => {
    if (foods && foods.length === 1) {
      const firstFood = foods[0];
      const foodId = 'idMeal' in firstFood ? firstFood.idMeal : firstFood.idDrink;
      // Essa é a parte mantida exatamente igual ao código funcional
      if (!pathname.includes(foodId)) {
        navigate(`/${'idMeal' in firstFood ? 'meals' : 'drinks'}/${foodId}`);
      }
    } else if (foods && foods.length === 0) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
  }, [foods, navigate, pathname]);

  function handleButton() {
    if (info.text.length > 1 && info.pesquisa === 'first-letter') {
      window.alert('Your search must have only 1 (one) character');
    } else {
      searchOption(info);
    }
  }

  return (
    <div>
      <input
        data-testid="search-input"
        type="text"
        name="text"
        value={ info.text }
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
        type="button"
        onClick={ handleButton }
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
