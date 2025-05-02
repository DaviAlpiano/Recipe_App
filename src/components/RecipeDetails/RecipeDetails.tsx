import React, { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { DrinkType, MealType, RecipeDetailsType } from '../../types';
import Carrosel from '../Carrosel/Carrosel';
import styles from './RecipeDetails.module.css';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetailsType | null>(null);
  const [shared, setShared] = useState('');
  const [iconFavor, setIconFavor] = useState(false);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [idStorage, setIdStorage] = useState<string>('');
  const [inProgress, setInProgress] = useState<boolean>(false);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      let apiUrl = '';
      if (location.pathname.includes('/meals/')) {
        setIdStorage('idMeal');
        apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks/')) {
        setIdStorage('idDrink');
        apiUrl = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setRecipeDetails(data.meals?.[0] || data.drinks?.[0]);
      } catch (error) {
        console.error('Erro ao buscar detalhes da receita:', error);
      }
    };

    const localS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    
    if (localS.length > 0) {
      if (location.pathname.includes('meals')) {
        const tOrF = id in localS.meals;
        setInProgress(tOrF);
      }
      if (location.pathname.includes('drinks')) {
        const tOrF = id in localS.drinks;
        setInProgress(tOrF);
      }
    }
    fetchRecipeDetails();
  }, [id, location.pathname]);

  useEffect(() => {
    const localS: DrinkType[] | MealType[] = JSON
      .parse(localStorage.getItem('favoriteRecipes'));

    if (localS !== null && recipeDetails) {
      const tOrF = localS.some((item) => item.id === recipeDetails[idStorage]);
      setIconFavor(tOrF);
    } else {
      setIconFavor(false);
    }
  }, [recipeDetails]);

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

  const handleFavoriteRecipe = (favorRecipe: unknown) => {
    const recp = favorRecipe as any;
    const recipeToLocalStorage = {
      id: recp?.idMeal || recp?.idDrink,
      type: recp?.idMeal ? 'meal' : 'drink',
      nationality: recp?.strArea ?? '',
      category: recp?.strCategory,
      alcoholicOrNot: recp?.strAlcoholic ?? '',
      name: recp?.strMeal || recp?.strDrink,
      image: recp?.strMealThumb || recp?.strDrinkThumb,
    };

    const recipeFromLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes') || '[]');
    const favorOrNot = recipeFromLocalStorage
      .findIndex((recipeFLS: any) => recipeFLS.id === recipeToLocalStorage.id);

    if (favorOrNot !== -1) {
      recipeFromLocalStorage.splice(favorOrNot, 1);
      setIconFavor(false);
    } else {
      recipeFromLocalStorage.push(recipeToLocalStorage);
      setIconFavor(true);
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify(recipeFromLocalStorage));
  };

  const drinkOrMeal = location.pathname.includes('/meals/') ? 'Meal' : 'Drink';

  if (!recipeDetails) {
    return <div>Carregando...</div>;
  }

  return (
    <main className={ styles.main }>
      <Carrosel pathname={ location.pathname } />
      <div className={ styles.name }>
        <h1 data-testid="recipe-title">
          {recipeDetails.strMeal || recipeDetails.strDrink}
        </h1>
        <p data-testid="recipe-category">
          { drinkOrMeal === 'Meal'
            ? recipeDetails.strCategory : recipeDetails.strAlcoholic}
        </p>
      </div>
      <div className={ styles.recipe }>
        <div>
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
        </div>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
          alt={ recipeDetails.strMeal || recipeDetails.strDrink }
        />
      </div>
      <div className={ styles.buttons }>
        <button
          className={ styles.button }
          data-testid="share-btn"
          type="button"
          onClick={ handleShareClick }
        >
          <div>
            {shared || 'Share'}
          </div>
        </button>

        {iconFavor ? <input
          onClick={ () => handleFavoriteRecipe(recipeDetails) }
          type="image"
          data-testid="favorite-btn"
          src={ blackHeartIcon }
          alt="Favorite"
        />
          : <input
              onClick={ () => handleFavoriteRecipe(recipeDetails) }
              type="image"
              data-testid="favorite-btn"
              src={ whiteHeartIcon }
              alt="Favorite"
          />}
      </div>
      <p
        className={ styles.inst }
        data-testid="instructions">
        {recipeDetails.strInstructions}
      </p>
      {recipeDetails.strYoutube && ( 
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ "https://www.youtube.com/embed/" + recipeDetails.strYoutube.split('=')[1] }
          title="YouTube video player"
          frameBorder="0"
          allowFullScreen
        />
      )}
      <Link to={ `${location.pathname}/in-progress` }>
        <button
          data-testid="start-recipe-btn"
          type="button"
          className={ styles.button }
        >
          {inProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      </Link>
    </main>
  );
}

export default RecipeDetails;
