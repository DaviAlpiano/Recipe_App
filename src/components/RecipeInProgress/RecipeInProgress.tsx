import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import APIContext from '../Context/ContextAPI/APIContext';
import { MealType, DrinkType, Meal, Drink } from '../../types';

function RecipeInProgress() {
  const { id } = useParams();
  const { foods } = useContext(APIContext);
  const [recipe, setRecipe] = useState<Meal | Drink | undefined>();

  useEffect(() => {
    const foundRecipe = foods.find((item) => (
      (item as MealType).idMeal === id || (item as DrinkType).idDrink === id
    ));
    setRecipe(foundRecipe as Meal | Drink | undefined);
  }, [id, foods]);

  if (!recipe) {
    return <div>Carregando...</div>;
  }

  // Verifica se a receita é uma refeição ou uma bebida
  const isMeal = (recipe as Meal).strMeal !== undefined;

  return (
    <div>
      {/* Imagem da receita */}
      <img
        src={ isMeal ? (recipe as Meal).strMealThumb : (recipe as Drink).strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />

      {/* Título da receita */}
      <h2 data-testid="recipe-title">
        {
      isMeal ? (recipe as Meal).strMeal : (recipe as Drink).strDrink
}
      </h2>

      {/* Categoria (apenas para comidas) */}
      { isMeal
      && (recipe as Meal).strCategory
      && <p data-testid="recipe-category">{(recipe as Meal).strCategory}</p>}

      {/* Se é alcoólico (apenas para bebidas) */}
      { !isMeal
      && (recipe as Drink).strAlcoholic
      && <p data-testid="recipe-alcoholic">{(recipe as Drink).strAlcoholic}</p>}

      {/* Lista de ingredientes com quantidades */}
      <ul data-testid="recipe-ingredients">
        {/* Mapeie os ingredientes e suas quantidades */}
        {Object.keys(recipe)
          .filter((key) => key.startsWith('strIngredient')
          && recipe[key as keyof (Meal | Drink)])
          .map((key) => (
            <li key={ key } data-testid={ `${key}-ingredient` }>
              {recipe[key as keyof (Meal | Drink)]}
              {' '}
              -
              {recipe[`strMeasure${key.slice(12)}` as keyof (Meal | Drink)]}
            </li>
          ))}
      </ul>

      {/* Instruções */}
      <p data-testid="instructions">
        { isMeal
          ? (recipe as Meal).strInstructions : (recipe as Drink).strInstructions }
      </p>
    </div>
  );
}

export default RecipeInProgress;
