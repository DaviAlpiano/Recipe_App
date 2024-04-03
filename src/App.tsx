import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login/Login';

function App() {
  return (
    <Router>
      <div className="meals">
        <span className="logo">GRUPO PUDIM</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
      </div>
      <Routes>
        <Route path="/" element={ <Login /> } />
        {/* Adicionem as rotas aqui, pessoal */}
      </Routes>
    </Router>
  );
}

export default App;
