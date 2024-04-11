import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { RecipeDetailsType } from '../../types';
import styles from './RecipeDetails.module.css';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(null);
  const [shared, setShared] = useState('');
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

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared('Link copied!');
  };

  if (shared) {
    <p>{shared}</p>;
    setTimeout(() => {
      setShared('');
    }, 3000);
  }

  const drinkOrMeal = location.pathname.includes('/meals/') ? 'Meal' : 'Drink';

  if (!recipeDetails) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink}
      </h1>
      <p data-testid="recipe-category">
        { drinkOrMeal === 'Meal' ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {Object.entries(recipeDetails)
          .filter(([key, value]) => key.includes('strIngredient') && value)
          .map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient[1]} - ${recipeDetails[`strMeasure${index + 1}`]} `}
            </li>
          ))}
      </ul>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />

      <button
        data-testid="share-btn"
        type="button"
        onClick={ handleShareClick }
      >
        <div>
          {shared || 'Share'}
        </div>
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favorite
      </button>

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
      <Link to={ `${location.pathname}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className={ styles.button }
        >
          Start Recipe
        </button>
      </Link>
    </div>
  );
}

export default RecipeDetails;
