import React, { useState, useEffect } from 'react';
import { Meal } from '../../types'; // Importa a interface Meal de types.ts
import Footer from '../Footer/Footer';

function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => setMeals(data.meals.slice(0, 12)));
  }, []);

  return (
    <>
      <div>
        {meals.map((meal, index) => (
          <div key={ meal.idMeal } data-testid={ `${index}-recipe-card` }>
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default Meals;
