import React, { useState } from "react";
import { Col, Row, Space, Table, message } from "antd";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Popconfirm from "antd/lib/popconfirm";

const { Column } = Table;

interface DataType {
  key: React.Key;
  nome: string;
  desc: string;
}

const data: DataType[] = [
  {
    key: '1',
    nome: 'CAD_USUARIO',
    desc: 'Cadastro de usuário'
  },
  {
    key: '2',
    nome: 'LIST_PERMISSOES',
    desc: 'Listar permissões'
  },
  {
    key: '3',
    nome: 'BX_ESTQ',
    desc: 'Realizar baixa no estoque'
  },
];

const confirm = (e: React.MouseEvent<Element, MouseEvent> | undefined) => {
  console.log(e);
  message.success('Permissão atribuida com sucesso!');
};

const cancel = (e: React.MouseEvent<Element, MouseEvent> | undefined) => {
  console.log(e);
  //message.error('Click on No');
};

function TabelaPermissoesComponent() {

    const [totalPages, setTotalPages] = useState(4);

    return (
        <>
            <div className="header-permissoes">
              <Row gutter={3}>
                  <Col className="gutter-row" span={9} >
                    <h4>Nome</h4>
                  </Col>
                  <Col className="gutter-row" span={5} >
                    <h4>Descrição</h4>
                  </Col>
              </Row>
            </div>

            <Table 
              showHeader={false}
              dataSource={data}
              pagination={{
                pageSize: 4,
                total: totalPages
              }}>
              <Column title="Nome" dataIndex="nome" key="nome" />
              <Column title="Descrição" dataIndex="desc" key="desc" />
              <Column
                title="Ações"
                key="acaoes"
                render={(_: any, record: DataType) => (
                  <Space size="large">
                    <Popconfirm
                        title="Permissão."
                        description="Deseja mesmo alterar essa permissão?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <a><CheckCircleOutlined style={{ fontSize: '21px' }} /></a>
                    </Popconfirm>
                  </Space>
                )}
              />
          </Table>
        </>
    );

}

export default TabelaPermissoesComponent;