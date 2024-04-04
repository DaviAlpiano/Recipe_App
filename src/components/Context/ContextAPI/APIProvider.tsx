import { useEffect, useState } from 'react';
import APIConxtet from './APIContext';
import { InfoSearchBar, MealType, DrinkType } from '../../types';

type ThemeProviderProps = {
  children: React.ReactNode;
};

function APIProvider({ children }: ThemeProviderProps) {
  const [optionAPI, setOptionAPI] = useState<string>('');
  const [localUrl, setLocalUrl] = useState<string>();
  const [text, setText] = useState<string>('');
  const [foods, setFoods] = useState<MealType[] | DrinkType[]>([]);

  //Davi: faz a busca na api com base nas informações
  useEffect(() => {
    const FetchApi = async () => {
      try {
        let whoFood = '';
        let url = '';
        if (localUrl === '/drinks') {
          whoFood = 'drinks';
          switch (optionAPI) {
            case 'ingredient':
              url = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
              break;
            case 'name':
              url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
              break;
            case 'first-letter':
              url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
              break;
            default:
              break;
          }
        } else {
          whoFood = 'meals';
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
        }
        const dados = await fetch(`${url}${text}`);
        if (url !== '') {
          const resultado = await dados.json();
          const arrayFoods = resultado[whoFood];
          setFoods(arrayFoods);
        }
      } catch (erro) {
        console.error(erro);
      }
    };

    FetchApi();
  }, [text, optionAPI]);

  //Davi: pega as informações da SearchBar pra fazer a busca na api.
  function searchOption(param:InfoSearchBar) {
    setOptionAPI(param.pesquisa);
    setText(param.text);
    setLocalUrl(param.url);
  }

  const value = {
    foods,
    text,
    optionAPI,
    searchOption,
  };

  return (
    <APIConxtet.Provider value={ value }>
      {children}
    </APIConxtet.Provider>
  );
}

export default APIProvider;
