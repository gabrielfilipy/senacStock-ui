import React from 'react';
import { LaptopOutlined } from '@ant-design/icons';
import TabelaProdutoComponent from '../../../components/tabela/produto/Tabela.produto.component ';
import { Col, Input, Row } from 'antd';
import { Link } from 'react-router-dom';

const { Search } = Input;

function ProdutoView() {

    return (
        <div className="content top bottom">
          <Row gutter={16}>
            <Col className="gutter-row" span={11}>
              <h2 className="titulo-principal">Produtos <LaptopOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="tabela">
             <TabelaProdutoComponent />
          </div>

          <div className="conteudo-cadastro">
            <div className="funcoes">
                <Row gutter={2}>
                  <Col className="gutter-row" span={4}>
                    <Link to="/produto/cadastro"><button className="btnCadastrar">Novo</button></Link>
                  </Col>
                </Row>
            </div>  
          </div>

        </div>
    );
}

export default ProdutoView;