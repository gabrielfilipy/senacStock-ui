import React from "react";
import { Col, List, Row } from 'antd';
import { SafetyCertificateOutlined } from "@ant-design/icons";
import '../Permissoes.view.css';
import TabelaPermissoesComponent from "../../../components/tabela/permissoes/Tabela.permissoes.component";

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

function PermissoesView() {

    return (
        <div className="content top bottom">

          <Row gutter={16}>
            <Col className="gutter-row" span={11}>
                <h2 className="titulo-principal">Permissões do sistema <SafetyCertificateOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <TabelaPermissoesComponent />
          
        </div>
    );
}

export default PermissoesView;