import React from 'react';
import { useNavigate } from 'react-router-dom';
import style from './Profile.module.css'

function Profile() {
  const navigate = useNavigate();
  const handleDoneRecipesClick = () => {
    navigate('/done-recipes'); // Redireciona pra tela de receitas feitas
  };

  const handleFavoriteRecipesClick = () => {
    navigate('/favorite-recipes');// Redireciona pra tela de receitas favoritas
  };

  const handleLogoutClick = () => {
    console.log('Logout button clicked');
    localStorage.clear();
    console.log('localStorage cleared:', localStorage);
    navigate('/');// Limpeza do localStorage e redireciona pra tela de login
  };

  const email = JSON.parse(localStorage.getItem('user') as string);
  
  return (
    <main className={style.main}>
        {/* Email do usuário */}
        <p
          data-testid="profile-email"
          className={style.email}>
          {`Email: ${email.email}`}
        </p>
        {/* Botões */}
        <div className={style.buttons}>
          <button
            className={style.button}
            data-testid="profile-done-btn" onClick={ handleDoneRecipesClick }>
            Done Recipes
          </button>
          <button
            className={style.button}
            data-testid="profile-favorite-btn" onClick={ handleFavoriteRecipesClick }>
            Favorite Recipes
          </button>
          <button
            className={style.button}
            data-testid="profile-logout-btn" onClick={ handleLogoutClick }>
            Logout
          </button>
        </div>
    </main>
  );
}

export default Profile;
