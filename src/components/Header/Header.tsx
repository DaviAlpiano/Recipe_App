import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';

function Header() {
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Estado para controlar a visibilidade (Davi)
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  let title = '';
  let showSearchIcon = false;

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible); // Alterna a visibilidade da barra de busca (Davi)
  };

  switch (path) {
    case '/meals':
      title = 'Meals';
      showSearchIcon = true;
      break;
    case '/drinks':
      title = 'Drinks';
      showSearchIcon = true;
      break;
    case '/profile':
      title = 'Profile';
      break;
    case '/done-recipes':
      title = 'Done Recipes';
      break;
    case '/favorite-recipes':
      title = 'Favorite Recipes';
      break;

    default:
      break;
  }

  return (
    <header>
      <button
        onClick={ handleProfileClick }
        style={ { background: 'none', border: 'none', cursor: 'pointer' } }
      >
        <img
          src={ profileIcon }
          alt="Profile Icon"
          data-testid="profile-top-btn"
        />
      </button>

      {/* Adiciona um botão para exibir a barra de busca (Davi) */}

      {showSearchIcon && (
        <button
          onClick={ toggleSearchBar }
          style={ { background: 'none', border: 'none', cursor: 'pointer' } }
        >
          <img
            src={ searchIcon }
            alt="Search Icon"
            data-testid="search-top-btn"
          />
        </button>
      )}
      {isSearchVisible && <SearchBar />}
      <h1 data-testid="page-title">{title}</h1>
    </header>
  );
}

export default Header;
