import React from 'react';
import HomeView from './views/home/Home.view';
import './App.css';
import { ConfigProvider } from 'antd';
import ptBr from 'antd/lib/locale/pt_BR';
import { Routes, Route } from 'react-router-dom';
import UsuarioView from './views/usuario/list/Usuario.view';
import ProdutoView from './views/produto/list/Produto.view';
import DepartamentoView from './views/departamento/list/Departamento.view';
import UsuarioFormView from './views/usuario/form/Usuario.form.view';
import ProdutoFormView from './views/produto/form/Produto.view.form';
import DepartamentoViewForm from './views/departamento/form/departamento.view.form';
import PermissoesView from './views/permissoes/list/Permissoes.view';
import RetirarView from './views/retirar/form/retirar.view';

function App() {
  return (
    <>
    <ConfigProvider locale={ptBr}>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/home" element={<HomeView />} /> 
        <Route path="/produto" element={<ProdutoView />} />
        <Route path="/produto/cadastro" element={<ProdutoFormView />} /> 
        <Route path="/produto/cadastro/:id" element={<ProdutoFormView />} /> 
        <Route path="/departamento" element={<DepartamentoView />} />
        <Route path="/departamento/cadastro" element={<DepartamentoViewForm />} />
        <Route path="/departamento/cadastro/:id" element={<DepartamentoViewForm />} />
        <Route path="/retirar" element={<RetirarView />} />
        <Route path="/usuario" element={<UsuarioView />} /> 
        <Route path="/usuario/cadastro" element={<UsuarioFormView />} /> 
        <Route path="/usuario/cadastro/:id" element={<UsuarioFormView />} /> 
        <Route path="/permissoes" element={<PermissoesView />} /> 
      </Routes>
    </ConfigProvider>
    </>
  );
}

export default App;  
