import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import APIContext from '../Context/ContextAPI/APIContext';
import { InfoSearchBar, Meal, Drink } from '../../types';
import style from './SearchBar.module.css'

type APIContextWithText = {
  searchOption: (search: InfoSearchBar) => void;
  foods: (Meal | Drink)[] | null;
  text: string;
};
// Farid: Conflito resolvido
function SearchBar() {
  const { searchOption, foods, text } = useContext(APIContext) as APIContextWithText;
  const navigate = useNavigate();
  const [info, setInfo] = useState<InfoSearchBar>({
    pesquisa: '',
    text,
    url: '',
  });
  const [prevLength, setPrevLength] = useState(0);
  const { pathname } = useLocation();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.currentTarget;
    setInfo({ ...info, [name]: value, url: pathname });
  }

  // Davi: exibe o alert caso nao seja encontrado nenhum elemento na busca
  // ou caso seja encontrado so um, redireciona pra pagina do mesmo
  useEffect(() => {
    if (prevLength === null) {
      // Define o comprimento inicial de foods para evitar o alert na montagem
      setPrevLength(foods.length);
      return;
    }

    if (foods && foods.length === 1) {
      const firstFood = foods[0];
      const foodId = 'idMeal' in firstFood ? firstFood.idMeal : firstFood.idDrink;
      // Essa é a parte mantida exatamente igual ao código funcional
      if (!pathname.includes(foodId)) {
        navigate(`/${'idMeal' in firstFood ? 'meals' : 'drinks'}/${foodId}`);
      }
    } else if (foods && foods.length === 0 && prevLength !== foods.length) {
      window.alert("Sorry, we haven't found any recipes for these filters");
    }
  }, [foods, navigate, pathname, prevLength]);
  // Davi: exibe um alert caso tente procurar com mais do q a primeira letra
  // ou envia as informações do input pro provider
  function handleButton() {
    if (info.text.length > 1 && info.pesquisa === 'first-letter') {
      window.alert('Your search must have only 1 (one) character');
    } else {
      searchOption(info);
    }
  }

  return (
    <div className={style.searchBar}>
      <input
        data-testid="search-input"
        type="text"
        name="text"
        value={ info.text }
        onChange={ handleChange }
      />
      <div className={style.radios}>
        <input
          type="radio"
          name="pesquisa"
          id="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        <label htmlFor="ingredient">Ingredient</label>
      </div>
      <div className={style.radios}>
        <input
          type="radio"
          name="pesquisa"
          id="name"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        <label htmlFor="name">Name</label>
      </div>
      <div className={style.radios}>
        <input
          type="radio"
          name="pesquisa"
          id="first-letter"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        <label htmlFor="first-letter">First Letter</label>
      </div>
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
