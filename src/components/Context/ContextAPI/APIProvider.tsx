import { useEffect, useState } from 'react';
import APIConxtet from './APIContext';
import { InfoSearchBar, FoodType } from '../../../types';

type ThemeProviderProps = {
  children: React.ReactNode;
};

function APIProvider({ children }: ThemeProviderProps) {
  const [optionAPI, setOptionAPI] = useState('');
  const [text, setText] = useState('');
  const [foods, setFoods] = useState<FoodType[]>([]);

  useEffect(() => {
    const FetchApi = async () => {
      try {
        let url = '';
        switch (optionAPI) {
          case 'ingredient':
            url = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
            break;
          case 'name':
            url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
            break;
          case 'first-letter':
            url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
            break;
          default:
            break;
        }
        const dados = await fetch(`${url}${text}`);
        if (url !== '') {
          const resultado = await dados.json();
          const arrayFoods = resultado.meals;
          setFoods(arrayFoods);
        }
      } catch (erro) {
        console.error(erro);
      }
    };

    FetchApi();
  }, [optionAPI]);

  function searchOption(param:InfoSearchBar) {
    setOptionAPI(param.pesquisa);
    setText(param.text);
  }

  const value = {
    searchOption,
  };

  return (
    <APIConxtet.Provider value={ value }>
      {children}
    </APIConxtet.Provider>
  );
}

export default APIProvider;
