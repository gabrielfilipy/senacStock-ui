import React from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import TabelaDepartamentoComponent from "../../../components/tabela/departamento/Tabela.departamento.component";
import { Input, Row } from "antd";
import Col from "antd/lib/grid/col";
import { Link } from "react-router-dom";
 
const { Search } = Input;

function DepartamentoView() {

    const onSearch = (value: string) => console.log(value);

    return (
        <div className="content top bottom">
          <Row gutter={16}>
            <Col className="gutter-row" span={11}>
              <h2 className="titulo-principal">Departamento <ApartmentOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <TabelaDepartamentoComponent /> 

          <div className="conteudo-cadastro">
            <div className="funcoes">
                <Row gutter={2}>
                  <Col className="gutter-row" span={4}>
                    <Link to="/departamento/cadastro"><button className="btnCadastrar">Novo</button></Link>
                  </Col>
                </Row>
            </div>  
          </div> 

        </div>
    );
}

export default DepartamentoView;