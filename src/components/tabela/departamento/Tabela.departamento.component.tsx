import React, { useEffect, useState } from 'react';
import { Col, Row, Space, Table, TableProps, Tag } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import './Tabela.departamento.component.css';
import useDepartamento from '../../../hooks/useDepartamento';
import usePagination from '../../../hooks/usePagination';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from 'antd/es/input/Search';

const { Column } = Table;

interface DataType {
    key: React.Key;
    idDepartamento: number;
    nomeDepartamento: string;
    descricaoDepartamento: string; 
}

function TabelaDepartamentoComponent() {

  const { departamento, setDepartamento, fecthDepartamento } = useDepartamento(0);
  const { actualPage, setActualPage } = usePagination();

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    setActualPage(Number(pagination.current));
  };

  useEffect(() => { 
    fecthDepartamento(0, '')
  }, [actualPage])

  const deletar = (idDepartamento: number) => {
    axios({
      method: 'DELETE',
      url: `http://localhost:8080/departamento/${idDepartamento}`,
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((result) => {
      fecthDepartamento(0, '')
    });
    
  }

  const onSearch = (matricula: string) => {
    fecthDepartamento(0, matricula);
  };

    return (
        <>
          <div className="funcoes">
            <Row gutter={1}>
              <Col className="gutter-row" span={8}>
                <Search placeholder="Buscar usuário..." onSearch={onSearch} enterButton size='large'/>
              </Col>
            </Row>
          </div>

          <div className="tabela">
          <div className="header-permissoes">
            <Row gutter={3}>
                <Col className="gutter-row-nome" >
                  <h4>Nome</h4>
                </Col>
                <Col className="gutter-row-descricao" >
                  <h4>Descrição</h4>
                </Col>
                <Col className="gutter-row-acoes" >
                  <h4>Ações</h4>
                </Col>
            </Row>
              
          </div>
            <Table 
                onChange={onChange}
                showHeader={false}
                dataSource={departamento.lista}
                pagination={{
                  pageSize: 4,
                  total: departamento.totalPages
                }}>
                <Column className="col-nome-depart" dataIndex="nomeDepartamento" key="nomeDepartamento" />
                <Column className="col-descricao-depart" dataIndex="descricaoDepartamento" key="descricaoDepartamento" />
                <Column
                  className="col-acoes-usu"
                  title="Ações"
                  key="acaoes"
                  render={(_: any, record: DataType) => (
                    <Space size="large">
                      <Link to={`/departamento/cadastro/${record?.idDepartamento}`}><EditOutlined style={{ fontSize: '21px' }} /></Link>
                      <div>
                        <button className="btn-acao-desativo" type="submit"
                          onClick={() => deletar(record?.idDepartamento)} >
                          <DeleteOutlined style={{ fontSize: '21px' }} />
                        </button>
                      </div>
                    </Space>
                  )}
                />
            </Table>
          </div>
        </>
    );

}

export default TabelaDepartamentoComponent;