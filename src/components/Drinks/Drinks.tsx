import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import APIContext from '../Context/ContextAPI/APIContext';
import { MealCategory, DrinkType } from '../../types';
import style from './Drinks.module.css'

function Drinks() {
  const [drinks, setDrinks] = useState<DrinkType[]>([]);
  const [categories, setCategories] = useState<MealCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrinks = async (category: string | null) => {
      let url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (category && category !== 'All') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        setDrinks(data.drinks.slice(0, 12));
      } catch (error) {
        console.error('Erro ao buscar bebidas:', error);
      }
    };

    fetchDrinks(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const data = await response.json();
        setCategories(data.drinks.slice(0, 5));
      } catch (error) {
        console.error('Erro ao buscar categorias de bebidas:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prevCategory) => (prevCategory === category ? null : category));
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/drinks/${id}`);
  };

  return (
    <main className={style.main}>
      <div
        id={ style.buttons }
        className="category-buttons">
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
        id={ style.drinks }
        className="drinks-container">
        {drinks.map((drink, index) => (
          <div // Mudando de button para div para manter os data-testid
            className={style.drink}
            key={ drink.idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleRecipeClick(drink.idDrink) }
            role="button" // Acessibilidade
            tabIndex={ 0 } // Acessibilidade, permite foco pelo teclado
            onKeyPress={ (e) => e.key === 'Enter' && handleRecipeClick(drink.idDrink) }
            style={ { cursor: 'pointer' } } // Visual feedback for interactivity
          >
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Drinks;
