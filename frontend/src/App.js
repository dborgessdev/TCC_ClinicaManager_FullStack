import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import MenuPrincipal from './pages/MenuPrincipal/MenuPrincipal';
import Cadastro from './pages/cadastro/Cadastro';
import PainelSenhas from './pages/painel-senha/painel-senhas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/painel-senha" element={<PainelSenhas />} />
        {/*<Route path="*" element={<NotFound />} />*/} {/* Rota para página 404 */} {/*Lembra de fazer a pagina de erro 404 n esquecer de forma nehuma */}
      </Routes>
    </Router>
  );
}

export default App;