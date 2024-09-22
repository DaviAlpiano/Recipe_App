import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Footer from './components/Footer/Footer';

function App() {
  return (
    <APIProvider>
      <Router>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route
            path="/meals"
            element={
              <>
                <Header />
                <Meals />
                <Footer />
              </>
            }
          />
          <Route
            path="/drinks"
            element={
              <>
                <Header />
                <Drinks />
                <Footer />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/done-recipes"
            element={
              <>
                <Header />
                <DoneRecipes />
              </>
            }
          />
          <Route
            path="/favorite-recipes"
            element={
              <>
                <Header />
                <FavoriteRecipes />
              </>
            }
          />
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
          <Route
            path="/meals/:id/in-progress"
            element={
              <>
                <Header />
                <RecipeInProgress />
              </>
            }
          />
          <Route
            path="/drinks/:id/in-progress"
            element={
              <>
                <Header />
                <RecipeInProgress />
              </>
            }
          />
          <Route path="/login/:id" element={ <Login /> } />
        </Routes>
      </Router>
    </APIProvider>
  );
}

export default App;
