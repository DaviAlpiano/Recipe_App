import React, { useState, useEffect } from 'react';
import { Drink } from '../../types'; // Importa a interface Drink de types.ts
import Footer from '../Footer/Footer';

function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);

  useEffect(() => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setDrinks(data.drinks.slice(0, 12)));
  }, []);

  return (
    <>
      <div>
        {drinks.map((drink, index) => (
          <div key={ drink.idDrink } data-testid={ `${index}-recipe-card` }>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
