import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom
import shareIcon from '../../images/shareIcon.svg'; // Certifique-se de que o caminho está correto

// Tipo para representar a receita feita
type DoneRecipe = {
  id: string;
  type: string; // 'meal' ou 'drink'
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[]; // Array de tags da receita
};

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<DoneRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<DoneRecipe[]>([]);
  const [showCopyMessage, setShowCopyMessage] = useState<boolean>(false);

  useEffect(() => {
    // Carrega as receitas feitas do localStorage
    const savedDoneRecipes = localStorage.getItem('doneRecipes');
    const parsedDoneRecipes: DoneRecipe[] = savedDoneRecipes
      ? JSON.parse(savedDoneRecipes) : [];
    setDoneRecipes(parsedDoneRecipes);
    setFilteredRecipes(parsedDoneRecipes); // Inicialmente, todas as receitas são exibidas
  }, []);

  const filterRecipes = (type: string) => {
    if (type === 'all') {
      setFilteredRecipes(doneRecipes);
    } else {
      const filtered = doneRecipes.filter((recipe) => recipe.type === type);
      setFilteredRecipes(filtered);
    }
  };

  const handleShareClick = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 2000); // A mensagem desaparece após 2 segundos
    });
  };

  return (
    <div>
      {/* Botões de filtro */}
      <button data-testid="filter-by-all-btn" onClick={ () => filterRecipes('all') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => filterRecipes('meal') }>
        Meals
      </button>
      <button data-testid="filter-by-drink-btn" onClick={ () => filterRecipes('drink') }>
        Drinks
      </button>

      {/* Mensagem "Link copied!" */}
      {showCopyMessage && <div className="copy-message">Link copied!</div>}

      {/* Lista de receitas feitas */}
      {filteredRecipes.map((recipe, index) => (
        <div key={ recipe.id } className="recipe-card">
          {/* Link envolvendo a imagem */}
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ `${recipe.name} recipe` }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          {/* Link envolvendo o nome da receita */}
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            <p>{recipe.name}</p>
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            {recipe.type === 'meal' ? `${recipe.nationality}
             - ${recipe.category}` : `${recipe.alcoholicOrNot} - ${recipe.category}`}
          </p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          {recipe.tags.slice(0, 2).map((tag, tagIndex) => (
            <span key={ tagIndex } data-testid={ `${index}-${tag}-horizontal-tag` }>
              {tag}
            </span>
          ))}
          <button onClick={ () => handleShareClick(`http://localhost:3000/${recipe.type}s/${recipe.id}`) } className="share-btn">
            <img
              src={ shareIcon }
              alt="Share Icon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
