import React, {  useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route  } from 'react-router-dom';
import '../Usuario.view.css';
import { IdcardOutlined } from '@ant-design/icons';
import TabelaUsuarioComponent from '../../../components/tabela/usuario/Tabela.usuario.component';
import { Col, Row } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { Input } from 'antd';

const { Search } = Input;

function UsuarioView() {

    return (
        <div className="content top bottom">
          <Row gutter={16}>
            <Col className="gutter-row" span={11}>
              <h2 className="titulo-principal">Usuário <IdcardOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="conteudo-cadastro"> 
            <TabelaUsuarioComponent /> 

             <div className="funcoes">
                <Row gutter={2}>
                  <Col className="gutter-row" span={4}>
                    <Link to="/usuario/cadastro"><button className="btnCadastrar">Novo</button></Link>
                  </Col>
                </Row>
             </div>  

          </div>

        </div>
    );
}

export default UsuarioView;