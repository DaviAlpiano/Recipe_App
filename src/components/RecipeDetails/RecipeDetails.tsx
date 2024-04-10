import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { RecipeDetailsType } from '../../types';
import './RecipeDetails.module.css';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(null);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      let apiUrl;
      if (location.pathname.includes('/meals/')) {
        apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks/')) {
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else {
        return;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecipeDetails(data.meals?.[0] || data.drinks?.[0]);
      } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
      }
    };

    fetchRecipeDetails();
  }, [id, location.pathname]);

  if (!recipeDetails) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink}
      </h1>
      <p data-testid="recipe-category">
        {recipeDetails.strCategory || recipeDetails.strAlcoholic}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(recipeDetails)
          .filter(([key, value]) => key.includes('strIngredient') && value)
          .map(([key, value]) => (
            <li
              key={ key }
              data-testid={ `${key}-ingredient-name-and-measure` }
            >
              {`${value} - ${recipeDetails[`strMeasure${key.slice(-1)}`]}`}
            </li>
          ))}
      </ul>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <video>
        {recipeDetails.strYoutube && (
          <source
            data-testid="video"
            src={ recipeDetails.strYoutube }
            type="video/mp4"
          />
        )}
        <track kind="captions" />
      </video>
      <button
        data-testid="start-recipe-btn"
        type="button"
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
