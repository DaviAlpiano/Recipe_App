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
import APIProvider from './components/Context/ContextAPI/APIProvider';

function App() {
  return (
    <APIProvider>

      <Router>
        {/* <div className="meals">
        <span className="logo">TRYBE</span>
        <object className="rocksGlass" type="image/svg+xml" data={ rockGlass }>
        Glass
        </object>
      </div> */}
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route
            path="/meals"
            element={
              <>
                <Header />
                <Meals />
              </>
          }
          />
          <Route
            path="/drinks"
            element={
              <>
                <Header />
                <Drinks />
              </>
          }
          />
          <Route
            path="/profile"
            element={
              <>
                <Header />
                <Profile />
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
          {/* Adicionem as rotas aqui, pessoal */}
          <Route
            path="/drinks/:id"
            element={
              <Header />
            }
          />
          <Route
            path="/meals/:id"
            element={
              <Header />
          }
          />
        </Routes>
      </Router>
    </APIProvider>
  );
}

export default App;
