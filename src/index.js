import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import App from './App';
import IndividualPokemon from './components/IndividualComponent'
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <nav className="bg-dark">
        <h1 className="text-white px-5 py-3"><a href="/" className="text-decoration-none text-white">Pokedex</a></h1>
    </nav>
    <BrowserRouter>
    <Routes>
    <Route path='/pokedex' element={<App />} />
    <Route path='/pokemon/:id' element={<IndividualPokemon />} />
    </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
