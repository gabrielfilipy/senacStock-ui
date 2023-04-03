import React, { useEffect, useState } from 'react';
import './Tabela.produto.component.css';
import { Col, Row, Space, Table, TableProps } from 'antd';
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import useProduto from '../../../hooks/useProduto';
import usePagination from '../../../hooks/usePagination';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';
import { Input } from 'antd';

const { Search } = Input;

const { Column } = Table;

function calculaData(date: any) {
  return moment(date).zone('+0100').format('DD/MM/YYYY HH:mm');  
}

interface DataType {
  key: React.Key;
  nome: string;
  qtd: number;
  dtCadastroProd: any;
  dtVencimentoProd: string;
  valor: string;
  idProduto: number;
  ativo: boolean;
}

function TabelaProdutoComponent() {

  const { produto, setProduto, fecthProduto } = useProduto(0);
  const { actualPage, setActualPage } = usePagination();

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    setActualPage(Number(pagination.current));
  };

  useEffect(() => { 
    fecthProduto(0, '')
  }, [actualPage])

  const ativarDesativar = (idProduto: number, ativo: boolean) => {
    axios({
      method: 'POST',
      url: `http://localhost:8080/produto/${idProduto}/ativar-desativar`,
      headers: {
        'Content-Type' : 'application/json'
      }, 
      data: !ativo
    })
    .then((result) => {
      fecthProduto(0, '')
    });
    
  }

  const onSearch = (value: any) => {
    fecthProduto(0, value);
  }

  return (
        <>

          <div className="funcoes">
            <Row gutter={1}>
              <Col className="gutter-row" span={8}>
                <Search placeholder="Buscar por produto..." onSearch={onSearch} enterButton size='large'/>
              </Col>
            </Row>
          </div> 

          <div className="header-permissoes">
            <Row gutter={3}>
                <Col className="col-nome-prod" >
                  <h4>Nome</h4>
                </Col>
                <Col className="col-qtd-prod" >
                  <h4>Qtd.</h4>
                </Col>
                <Col className="col-dt-cadastro-prod"  >
                  <h4>Dt. Cadastro</h4>
                </Col>
                <Col className="col-dt-venc-prod" >
                  <h4>Dt. Vencimento</h4>
                </Col>
                <Col className="col-valor-prod" >
                  <h4>Valor</h4>
                </Col>
                <Col className="col-acoes-prod" >
                  <h4>Ações</h4>
                </Col>
            </Row>
          </div>

          <Table 
              onChange={onChange}
              showHeader={false}
              dataSource={produto.lista}
              pagination={{
                pageSize: 4,
                total: produto.totalPages
              }}>
              <Column className="gutter-row-nome-prod" title="Nome" dataIndex="nomeProduto" key="nomeProduto" />
              <Column className="gutter-row-qtd-prod" title="Quantidade" dataIndex="qtdProduto" key="qtdProduto" />
              <Column className="gutter-row-dt-cadastro-prod" title="Dt. Cadastro" dataIndex="dtCadastroProd" key="dtCadastroProd"
                      render={(_: any, record: DataType) => (
                        <p>{calculaData(new Date(record?.dtCadastroProd).toISOString())}</p>
                      )} />
              <Column className="gutter-row-dt-venc-prod" title="Dt. Vencimento" dataIndex="dtVencimentoProd" key="dtVencimentoProd" 
                render={(_: any, record: DataType) => (
                  <p>{calculaData(new Date(record?.dtVencimentoProd).toISOString())}</p>
                )}/>
              <Column className="gutter-row-valor-prod" title="Valor" dataIndex="valorProduto" key="valorProduto" />
              <Column
                className="gutter-row-acoes-prod"
                title="Ações"
                key="acaoes"
                render={(_: any, record: DataType) => (
                  <Space size="large">
                    <Link to={`/produto/cadastro/${record?.idProduto}`}><EditOutlined style={{ fontSize: '21px' }} /></Link>
                    
                    <div>
                      <button className="btn-acao-ativo" type="submit"
                        onClick={() => ativarDesativar(record?.idProduto, record?.ativo)} 
                        hidden={record?.ativo} >
                        <UnlockOutlined style={{ fontSize: '21px' }} />
                      </button>

                      <button className="btn-acao-desativo" type="submit"
                        onClick={() => ativarDesativar(record?.idProduto, record?.ativo)} 
                        hidden={!record?.ativo} >
                        <LockOutlined style={{ fontSize: '21px' }} />
                      </button>
                    </div>
                    
                  </Space>
                )}
              />
          </Table>
        </>
    );

}

export default TabelaProdutoComponent;