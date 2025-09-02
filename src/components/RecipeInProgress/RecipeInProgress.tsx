import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe } from '../../types';
import styles from './RecipeInProgress.module.css';

export const createMealRecipe = (receita: Recipe) => {
  return {
    id: receita.idMeal,
    nationality: receita.strArea,
    name: receita.strMeal,
    category: receita.strCategory,
    image: receita.strMealThumb,
    tags: receita.strTags ? receita.strTags.split(',') : [],
    alcoholicOrNot: receita.strAlcoholic || '',
    type: 'meal',
    doneDate: new Date(),
  };
};

function RecipeInProgress() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [copyMessage, setCopyMessage] = useState<string | null>(null);
  const [isFavorited, setIsFavorited] = useState(true);
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      let url = '';
      if (location.pathname.includes('/meals')) {
        url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      } else if (location.pathname.includes('/drinks')) {
        url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      }
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        const recipeData = location.pathname.includes('/meals')
          ? data.meals[0] : data.drinks[0];
        setRecipe(recipeData);
      } catch (error) {
        console.error('Erro ao buscar receita:', error);
      }
    };
    fetchRecipe();
  }, [id, location.pathname]);

  useEffect(() => {
    const savedIngredients = localStorage.getItem('inProgressRecipes');
    if (savedIngredients) {
      setCheckedIngredients(JSON.parse(savedIngredients));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
  }, [checkedIngredients, id]);

  const handleCheck = (ingredient: string) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  const copyLink = () => {
    let url = window.location.href;
    url = url.replace('/in-progress', '');
    navigator.clipboard.writeText(url);
    setCopyMessage('Link copied!');
  };

  const favoriteRecipe = () => {
    if (recipe) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
      let newRecipe;
      if (location.pathname.includes('/meals')) {
        newRecipe = {
          id: recipe.idMeal,
          type: 'meal',
          nationality: recipe.strArea,
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strMeal,
          image: recipe.strMealThumb,
        };
      } else if (location.pathname.includes('/drinks')) {
        newRecipe = {
          id: recipe.idDrink,
          type: 'drink',
          nationality: '',
          category: recipe.strCategory,
          alcoholicOrNot: recipe.strAlcoholic || '',
          name: recipe.strDrink,
          image: recipe.strDrinkThumb,
        };
      }
      if (newRecipe) {
        favoriteRecipes.push(newRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
      }
    }
  };

  const unfavoriteRecipe = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    favoriteRecipes = favoriteRecipes.filter((receita: Recipe) => receita.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const isFoodFavorited = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    return favoriteRecipes.some((receita: Recipe) => receita.id === id);
  };

  useEffect(() => {
    setIsFavorited(isFoodFavorited());
  }, [id]);

  const toggleFavorite = () => {
    if (isFavorited) {
      unfavoriteRecipe();
    } else {
      favoriteRecipe();
    }
    setIsFavorited(!isFavorited);
  };

  const allIngredientsChecked = () => {
    if (recipe) {
      const ingredients = Object.keys(recipe)
        .filter((key) => key.startsWith('strIngredient') && recipe[key])
        .map((key) => recipe[key] as string);
      return ingredients.every((ingredient) => checkedIngredients.includes(ingredient));
    }
    return false;
  };

  const createDrinkRecipe = (receita: Recipe) => {
    return {
      alcoholicOrNot: receita.strAlcoholic || '',
      category: receita.strCategory,
      doneDate: new Date(),
      id: receita.idDrink,
      image: receita.strDrinkThumb,
      name: receita.strDrink,
      nationality: receita.strArea || '',
      tags: receita.strTags ? receita.strTags.split(',') : [],
      type: 'drink',
    };
  };

  const finishRecipe = () => {
    if (recipe) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
      let newRecipe;
      if (location.pathname.includes('/meals')) {
        newRecipe = createMealRecipe(recipe);
      } else {
        newRecipe = createDrinkRecipe(recipe);
      }
      if (newRecipe) {
        const newRecipies = [...doneRecipes, newRecipe];
        localStorage.setItem('doneRecipes', JSON.stringify(newRecipies));
        navigate('/done-recipes');
      }
    }
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className={ styles.main }>
      <div className={ styles.details }>
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
          data-testid="recipe-photo"
        />
        <div className={ styles.detialsName }>
          <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
          {recipe.strAlcoholic && <p>{recipe.strAlcoholic}</p>}
        </div>
      </div>
      <div className={ styles.steps }>
        <ul>
          {Object.keys(recipe)
            .filter((key) => key.startsWith('strIngredient') && recipe[key])
            .map((key, index) => {
              const ingredient = recipe[key] as string;
              return (
                <li key={ key }>
                  <label
                    data-testid={ `${index}-ingredient-step` }
                    className={ checkedIngredients.includes(
                      ingredient,
                    ) ? 'checked-ingredient' : '' }
                  >
                    <input
                      type="checkbox"
                      onChange={ () => handleCheck(ingredient) }
                      checked={ checkedIngredients.includes(ingredient) }
                    />
                    <span>{ingredient}</span>
                  </label>
                </li>
              );
            })}
        </ul>
        <p>Instruções:</p>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </div>
      <div className={ styles.buttons }>
        <button
          data-testid="share-btn"
          onClick={ copyLink }
          className={ styles.button }
        >
          Compartilhar
        </button>
        {copyMessage && <p>{copyMessage}</p>}
        <button
          onClick={ toggleFavorite }
          className={ styles.favorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFoodFavorited() ? '/src/images/blackHeartIcon.svg'
              : '/src/images/whiteHeartIcon.svg' }
            alt="Favorito"
          />
        </button>
        <button
          data-testid="finish-recipe-btn"
          disabled={ !allIngredientsChecked() }
          onClick={ finishRecipe }
          className={ styles.button }
        >
          Finalizar Receita
        </button>
      </div>
    </main>
  );
}

export default RecipeInProgress;
