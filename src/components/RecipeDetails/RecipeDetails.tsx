import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';

interface RecipeDetails {
  // Defina as propriedades dos detalhes da receita conforme necessário
  idMeal?: string;
  strMeal?: string;
  strInstructions?: string;
  strMealThumb?: string;
  idDrink?: string;
  strDrink?: string;
  strDrinkThumb?: string;
}

function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
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
        return; // or handle unexpected path
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
    return <div>Carregando...</div>; // ou algum componente de loading
  }

  return (
    <div>
      <h1>{recipeDetails.strMeal || recipeDetails.strDrink}</h1>
      <img
        src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal || recipeDetails.strDrink }
      />
      <p>{recipeDetails.strInstructions}</p>
      {/* Adicione mais detalhes da receita conforme necessário */}
    </div>
  );
}

export default RecipeDetails;
