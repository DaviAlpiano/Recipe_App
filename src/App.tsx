import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';
import Meals from './components/Meals/Meals';
import Drinks from './components/Drinks/Drinks';
import DoneRecipes from './components/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './components/FavoriteRecipes/FavoriteRecipes';
import Profile from './components/Profile/Profile';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; // Importação do componente Footer
import APIProvider from './components/Context/ContextAPI/APIProvider';

function App() {
  return (
    <APIProvider>
      <Router>
        {/* Header e Footer serão renderizados em todas as páginas, mas Header é condicional dentro de cada rota, se necessário */}
        <Routes>
          <Route path="/" element={ <Login /> } />
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
          <Route path="/drinks/:id" element={ <Header /> } />
          <Route path="/meals/:id" element={ <Header /> } />
          {/* Adicione outras rotas conforme necessário */}
        </Routes>
        <Footer />
        {' '}
        {/* Footer é renderizado aqui, fora do componente Routes */}
      </Router>
    </APIProvider>
  );
}

export default App;
