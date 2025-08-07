import { useEffect, useState } from 'react';
import { DrinkType, InfoCaroselType, MealType } from '../../types';
import style from './Carrosel.module.css';

type CarroselType = {
  pathname: string;
};

function Carrosel({ pathname }:CarroselType) {
  const [allRec, setAllRec] = useState<DrinkType[] | MealType[]>([]);
  const [rec, setRec] = useState<DrinkType[] | MealType[]>([]);
  const [info, setInfo] = useState<InfoCaroselType>({
    id: '',
    str: '',
    strThumb: '',
  });

  // Davi: useEffect pra pegar informações
  useEffect(() => {
    async function searchRec() {
      let mOrD;
      let apiUrl;
      if (pathname.includes('/meals/')) {
        setInfo({
          id: 'idDrink',
          str: 'strDrink',
          strThumb: 'strDrinkThumb' });
        mOrD = 'drinks';
        apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic';
      } else if (pathname.includes('/drinks/')) {
        setInfo({
          id: 'idMeal',
          str: 'strMeal',
          strThumb: 'strMealThumb' });
        mOrD = 'meals';
        apiUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else {
        return;
      }
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setAllRec(data[mOrD] || []);
        // Davi: se a resposta for vazia, retorna um array vazio
      } catch (error) {
        console.error('Erro ao buscar receitas', error);
      }
    }
    searchRec();
  }, [pathname]);

  // DAvi: define as recomendaçoes
  useEffect(() => {
    const firstSix = allRec.slice(0, 6);
    setRec(firstSix);
  }, [allRec]);

  return (
    // Davi: cria o carrosel
    <div id="imagemContainer" className={ style.carrosel }>
      {
        rec.map((drink, index) => (
          <div
            key={ drink[info.id] }
            className={ style.itemCar }
            data-testid={ `${index}-recommendation-card` }
          >
            <img
              className={ style.img }
              src={ drink[info.strThumb] }
              alt={ drink[info.str] }
            />
            <h4
              data-testid={ `${index}-recommendation-title` }
            >
              {drink[info.str]}
            </h4>
          </div>
        ))
        }
    </div>
  );
}

export default Carrosel;
