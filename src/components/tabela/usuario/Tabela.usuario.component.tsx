import React, { useEffect } from 'react';
import { Col, Row, Space, Table, TableProps } from 'antd';
import { EditOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import './Tabela.usuario.component.css';
import useUsuario from '../../../hooks/useUsuario';
import usePagination from '../../../hooks/usePagination';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Search from 'antd/es/input/Search';

const { Column } = Table;

interface DataType {
  key: React.Key;
  idUsuario: number;
  matriculaUsuario: string;
  nomeUsuario: string;
  emailUsuario: string;
  ativo: boolean;
}

function TabelaUsuarioComponent() { 
  
  const matricula = '';
  const { usuarios, setUsuarios, fecthUsuario } = useUsuario(0);
  const { actualPage, setActualPage } = usePagination();

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    setActualPage(Number(pagination.current));
  };

  useEffect(() => { 
    fecthUsuario(0, matricula)
  }, [actualPage])
 
  const ativarDesativar = (idUsuario: number, ativo: boolean) => {
    axios({
      method: 'POST',
      url: `http://localhost:8080/usuario/${idUsuario}/ativar-desativar`,
      headers: {
        'Content-Type' : 'application/json'
      }, 
      data: !ativo
    })
    .then((result) => {
      fecthUsuario(0, '')
    });
    
  }

  const onSearch = (matricula: string) => {
    fecthUsuario(0, matricula);
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
              <Row gutter={5}>
                  <Col className="gutter-row-matricula" >
                    <h4 className=''>Sigla</h4>
                  </Col>
                  <Col className="gutter-row-nome" >
                    <h4>Nome</h4>
                  </Col>
                  <Col className="gutter-row-email" >
                    <h4>E-mail</h4>
                  </Col>
                  <Col className="gutter-row-acoes" >
                    <h4>Ações</h4>
                  </Col>
              </Row>
            </div>
            <Table 
              onChange={onChange}
              showHeader={false}
              dataSource={usuarios.lista}
              pagination={{ 
                pageSize: 4,
                total: usuarios.totalPages,
              }}>
              <Column className="col-matricula-usu" title="Sigla" dataIndex="matriculaUsuario" key="matriculaUsuario" />
              <Column className="col-nome-usu" title="Nome" dataIndex="nomeUsuario" key="nomeUsuario" />
              <Column className="col-email-usu" title="E-mail" dataIndex="emailUsuario" key="emailUsuario" />
              <Column
                className="col-acoes-usu"
                title="Ações"
                key="acaoes"
                render={(_: any, record: DataType) => (
                  <Space size="large">
                    <Link to={`/usuario/cadastro/${record?.idUsuario}`}><EditOutlined style={{ fontSize: '21px' }} /></Link>
                    
                    <div>
                      <button className="btn-acao-ativo" type="submit"
                        onClick={() => ativarDesativar(record?.idUsuario, record?.ativo)} 
                        hidden={record?.ativo} >
                        <UnlockOutlined style={{ fontSize: '21px' }} />
                      </button>

                      <button className="btn-acao-desativo" type="submit"
                        onClick={() => ativarDesativar(record?.idUsuario, record?.ativo)} 
                        hidden={!record?.ativo} >
                        <LockOutlined style={{ fontSize: '21px' }} />
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

export default TabelaUsuarioComponent;