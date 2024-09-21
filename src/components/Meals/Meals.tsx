import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MealCategory, MealType } from '../../types';
import style from './Meals.module.css';

function Meals() {
  const [meals, setMeals] = useState<MealType[]>([]);
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeals = async (category: string | null) => {
      let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      if (category && category !== 'All') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMeals(data.meals.slice(0, 12));
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      }
    };

    fetchMeals(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.meals.slice(0, 5));
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/meals/${id}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent, id: string) => {
    if (event.key === 'Enter') {
      handleRecipeClick(id);
    }
  };

  return (
    <main className={ style.main }>
      <div
        id={ style.buttons }
        className="category-buttons"
      >
        <button
          data-testid="All-category-filter"
          onClick={ () => setSelectedCategory(null) }
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => handleCategoryClick(category.strCategory) }
            className={ selectedCategory === category.strCategory ? 'active' : '' }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div
        id={ style.meals }
        className="meals-container"
      >
        {meals.map((meal, index) => (
          <div
            className={ style.meal }
            key={ meal.idMeal }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleRecipeClick(meal.idMeal) }
            onKeyPress={ (event) => handleKeyPress(event, meal.idMeal) }
            role="button"
            tabIndex={ 0 }
            style={ { cursor: 'pointer' } } // Visual feedback for interactivity
          >
            <img
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Meals;
