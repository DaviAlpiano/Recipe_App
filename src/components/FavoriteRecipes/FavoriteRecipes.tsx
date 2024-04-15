import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import { FavoriteRecipe } from '../../types';
import style from './FavoriteRecipes.module.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<FavoriteRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<FavoriteRecipe[]>([]);
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);

  useEffect(() => {
    const savedFavoriteRecipes = localStorage.getItem('favoriteRecipes');
    const parsedFavoriteRecipes: FavoriteRecipe[] = savedFavoriteRecipes
      ? JSON.parse(savedFavoriteRecipes)
      : [];
    setFavoriteRecipes(parsedFavoriteRecipes);
    setFilteredRecipes(parsedFavoriteRecipes);
  }, []);

  const handleFilter = (type: string) => {
    if (type === 'all') {
      setFilteredRecipes(favoriteRecipes);
    } else {
      const filtered = favoriteRecipes.filter((recipe) => recipe.type === type);
      setFilteredRecipes(filtered);
    }
  };

  const handleShareClick = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000);
    });
  };

  const handleUnfavoriteClick = (id: string) => {
    const updatedFavorites = favoriteRecipes.filter(
      (recipe) => recipe.id !== id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    setFavoriteRecipes(updatedFavorites);
    setFilteredRecipes(updatedFavorites);
  };

  return (
    <div>
      <div className="filter-buttons">
        <button
          onClick={ () => handleFilter('all') }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          onClick={ () => handleFilter('meal') }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          onClick={ () => handleFilter('drink') }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id } className="recipe-card">
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              className={ style.img }
              src={ recipe.image }
              alt={ `${recipe.name} recipe` }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            <p>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal'
              ? `${recipe.nationality} - ${recipe.category}`
              : `${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <button onClick={ () => handleShareClick(`http://localhost:3000/${recipe.type}s/${recipe.id}`) } className="share-btn">
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <button
            onClick={ () => handleUnfavoriteClick(recipe.id) }
            className="unfavorite-btn"
            src={ `${index}-horizontal-favorite-btn` }
          >
            <img
              src={ blackHeartIcon }
              alt="Unfavorite Icon"
              data-testid={ `${index}-horizontal-favorite-btn` }
            />
          </button>
        </div>
      ))}
      {showCopyMessage && <div className="copy-message">Link copied!</div>}
    </div>
  );
}

export default FavoriteRecipes;
