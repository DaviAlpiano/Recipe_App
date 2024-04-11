import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Meals from './components/Meals/Meals';
import Drinks from './components/Drinks/Drinks';
import DoneRecipes from './components/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes/FavoriteRecipes';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import APIProvider from './components/Context/ContextAPI/APIProvider';
import RecipeDetails from './components/RecipeDetails/RecipeDetails';
import RecipeInProgress from './components/RecipeInProgress/RecipeInProgress';
import Recipes from './components/Recipes/Recipes';

function App() {
  return (
    <APIProvider>
      <Router>
        {/* Header e Footer serão renderizados em todas as páginas, mas Header é condicional dentro de cada rota, se necessário */}
        <Routes>
          <Route
            path="/"
            element={ <Login /> }
          />
          <Route
            path="/recipes"
            element={ (
              <>
                <Header />
                <Recipes />
              </>
            ) }
          />
          <Route
            path="/meals"
            element={ (
              <>
                <Header />
                <Meals />
              </>
            ) }
          />
          <Route
            path="/drinks"
            element={ (
              <>
                <Header />
                <Drinks />
              </>
            ) }
          />
          <Route
            path="/profile"
            element={ (
              <>
                <Header />
                <Profile />
              </>
            ) }
          />
          <Route
            path="/done-recipes"
            element={ (
              <>
                <Header />
                <DoneRecipes />
              </>
            ) }
          />
          <Route
            path="/favorite-recipes"
            element={ (
              <>
                <Header />
                <FavoriteRecipes />
              </>
            ) }
          />
          {/* Novas rotas */}
          <Route
            path="/meals/:id/in-progress"
            element={ (
              <>
                <Header />
                <RecipeInProgress />
              </>
            ) }
          />
          <Route
            path="/drinks/:id/in-progress"
            element={ (
              <>
                <Header />
                <RecipeInProgress />
              </>
            ) }
          />
          {/* Fim das novas rotas */}
          <Route
            path="/drinks/:id"
            element={
              <>
                <Header />
                <RecipeDetails />
              </>
           }
          />
          <Route
            path="/meals/:id"
            element={
              <>
                <Header />
                <RecipeDetails />
              </>
}
          />
          <Route path="/login/:id" element={ <Login /> } />
          <Route path="/drinks/:id/in-progress" element={ <Header /> } />
          <Route path="/meals/:id/in-progress" element={ <Header /> } />
          {/* outras rotas */}
        </Routes>
      </Router>
    </APIProvider>
  );
}

export default App;
