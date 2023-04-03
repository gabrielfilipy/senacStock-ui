import React, { useState } from "react";
import { DownloadOutlined, IdcardOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Row } from "antd";
import Col from "antd/lib/grid/col";

import TabelaRetirarView from "../../../components/tabela/retirar/Tabela.retirar";
import { Link } from "react-router-dom";

function RetirarView() {

    return (
        <div className="content top bottom">
            
            <Row gutter={1}>
                <Col className="gutter-row" span={11}>
                    <h2 className="titulo-principal">Retirar produto <DownloadOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
                </Col>
            </Row>
            
            <div className="conteudo-cadastro"> 
                <TabelaRetirarView />
            </div>
        </div>
    );

}

export default RetirarView;