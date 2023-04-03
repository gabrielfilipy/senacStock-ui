import React, { useEffect, useState } from "react";
import { Col, Row, Tooltip } from "antd";
import Search from 'antd/es/input/Search';
import './Tabela.retirar.component.css';
import Modal from "react-modal";
import { Produto } from "../../../types/Produto";
import { Retirada } from "../../../types/Retirada";
import axios from "axios";
import { useForm } from "react-hook-form";
import { RetiradaProduto } from "../../../types/RetiradaProduto";
import { EyeInvisibleOutlined, EyeOutlined, FileSearchOutlined } from "@ant-design/icons";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e0e0e0  ',
    width: '30%'
  },
};

const estiloModalRetirada = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid #e0e0e0  ',
    width: '40%'
  },
};

Modal.setAppElement('#root');

function TabelaRetirarView() {

  var id:any = 0;

  const { handleSubmit, formState: { errors }, reset } = useForm({ });

  const [ retirada , setRetirada ] = useState<Retirada>( { } );
  const [ retiradaLista , setRetiradaLista ] = useState<Retirada[]>( [] );
  const [ retiradaProdutoLista , setRetiradaProdutoLista ] = useState<RetiradaProduto[]>( [] );
  const [ temProdutosRetirada, setTemProdutosRetirada ] = useState(false);
  const [ index, setIndex ] = useState();
  const [ produto, setProduto ] = useState<Produto>();
  const [ retiradaProduto, setRetiradaProduto ] = useState<RetiradaProduto>( {  } );
  const [ retiradaId, setRetiradaId ] = useState();
  const [ lista, setLista ] = useState<Produto[]>([]);
  const [ modal, setModal] = useState(false);
  const [ modalConfirm, setModalConfirm] = useState(false);
  const [ modalListaRetiradas, setModalListaRetiradas ] = useState(false);
  const [ inputText, setInputText ] = useState('');

  const onChang = (event:any) => {
    setInputText(event.target.value);
  }

  const fecharModal = () => {
    setModal(false);
  }

  const fecharModalListarRetiradas = () => {
    setModalListaRetiradas(false);
  }

  function buscarPorCodigo(codigo: any) {
    fetch(
        `http://localhost:8080/produto/buscar/${codigo}`
    )
    .then(res => res.json())
    .then(data => {
        setProduto(data);
    }).catch(alert);
  }

  const retirarProduto = (data:any) => axios.post("http://localhost:8080/retirada/criar", data)
    .then((response) => {
      console.log('Response: ' + response.data.idRetirada);
      setRetiradaId(response.data.idRetirada);
    }).catch(console.log);

  const buscarRetiradasDesseUsuario = (idUsuario:any) => axios.get(`http://localhost:8080/retirada/${idUsuario}/usuario`)
    .then((response) => {
      console.log('Response retiradas: ' + response.data);
      setRetiradaLista(response.data);
    }).catch(console.log);

    const buscarProdutoRetiradasDesseUsuario = (idRetirada:any) => axios.get(`http://localhost:8080/retirada/${idRetirada}/produto`)
    .then((response) => {
      setTemProdutosRetirada(true);
      setRetiradaProdutoLista(response.data);
    }).catch(console.log);

  const adicionaRetiradaProduto = (idProduto:any, quantidade:number, idRetirada: any) => axios.post(`http://localhost:8080/retirada/adicionar-produto?idProduto=${idProduto}&quantidade=${quantidade}&idRetirada=${idRetirada}`, '')
    .then((response) => {
      console.log('Response: ' + response);

      //Reseta página
      setLista([]);
      setModalConfirm(false);
    }).catch(console.log);

  function inciarBaixaNoEstoque () {
    let novaRetirada = {...retirada};
    setRetirada(ret => ({ ...novaRetirada, total:lista.length, usuario:{ idUsuario:1 } }));
    abrirModalConfirm();
  }

  function addProduto() {
    let novaLista = [...lista];
    novaLista.push({
      idProduto: produto?.idProduto,
      departamento: produto?.departamento,
      nomeProduto: produto?.nomeProduto,
      qtdParaDarBaixa: inputText
    })
    setLista(novaLista);
    setInputText('');
    setModal(false);
  }

  const removeProduto = (index:any) => {
    let novaLista = [...lista];
    novaLista.splice(index, 1);
    setLista(novaLista);
  }

  const buscarProduto = (codigo: string) => {
    buscarPorCodigo(codigo)
    setModal(true);
  };

  const visualizarProdutosRetirada = (codigo: any, e:any) => {
    setIndex(e);
    buscarProdutoRetiradasDesseUsuario(codigo);
  }

  function abrirModalListaRetiradas() {
    buscarRetiradasDesseUsuario(1);
    setModalListaRetiradas(true);
  }

  //Confirmação baixa estoque
  function abrirModalConfirm () {
    setModalConfirm(true);
  }

  function fecharModalConfirm () {
    setModalConfirm(false);
  }

  useEffect(() => {
    if(retiradaId) {
      lista.map((produto, index) => (
          adicionaRetiradaProduto(produto.idProduto, produto.qtdParaDarBaixa, retiradaId)
      ));
    }
  }, [retiradaId]);

  function opcaoModalConfirm(opcao:boolean) {
    if(opcao) 
      retirarProduto(retirada);
    else
      fecharModalConfirm();
  }

    return (
        <>
            <Modal
              isOpen={modalConfirm}
              style={customStyles}
            >
              <span id="closeModal" onClick={fecharModalConfirm}>x</span>
              <div className="form-dialog">

                <Row gutter={1} >
                  <Col className="gutter-row" span={22}>
                    <h2 className="titulo-modal">Confirmação</h2>
                  </Col>
                
                  <Col className="gutter-row" span={22}>
                    <span>Confirma essa operação?</span>
                  </Col>

                  <Col className="gutter-row" span={22}>
                    <button type="submit" className="btnCadastrar" onClick={() => opcaoModalConfirm(true)}>Sim</button>
                    <button type="submit" className="btnCancelar" onClick={() => opcaoModalConfirm(false)}>Não</button>
                  </Col>
                </Row>
              </div>
            </Modal>

            <Modal
              isOpen={modal}
              style={customStyles}
            >
              <span id="closeModal" onClick={fecharModal}>x</span>
              <div className="form-dialog">

                <Row gutter={1}>
                  <Col className="gutter-row" span={22}>
                    <h2 className="titulo-modal">Informe a quantidade</h2>
                  </Col>
                </Row>

                <h5>Informações do produto: </h5>
                <Row gutter={1}>
                  <Col className="gutter-row" span={22}>
                      <span>Nome: <b>{produto?.nomeProduto}</b></span>
                  </Col>
                  <Col className="gutter-row" span={22}>
                      <span>Departamento: <b>{produto?.departamento?.nomeDepartamento}</b></span>
                  </Col>
                </Row>
                <input type="text" onChange={(e) => {setInputText(e.target.value)}} className="input-form-modal" placeholder="Quantidade..." name="qtdProduto"/> 
                <button type="submit" className="btnCadastrar" onClick={addProduto}>Ok</button>
              </div>
            </Modal>

            <Modal
              isOpen={modalListaRetiradas}
              style={estiloModalRetirada}
            >
              <span id="closeModal" onClick={fecharModalListarRetiradas}>x</span>
              <div className="form-dialog">
                <Row gutter={1}>
                  <Col className="gutter-row" span={22}>
                    <h2 className="titulo-modal">Suas retiradas</h2>
                  </Col>
                </Row>
                
                {/*TODO: Componetizar*/}
                { 
                  <div className="tabela">
                  <div className="header-tabela"> 
                    <Row gutter={5}>
                      <Col className="col-id-retirada" >
                        <h4>Código</h4>
                      </Col>
                      <Col className="col-data-retirada" >
                        <h4>Data</h4>
                      </Col>
                      <Col className="col-total-retirada" >
                        <h4>Total</h4>
                      </Col>
                    </Row>
                  </div>
                  <div className="colunas-tabela">
                    {retiradaLista.map((retiradaUsu, indexSel) => (
                          <Row gutter={5}>
                            <Col className="col-id-retirada" >
                              {retiradaUsu.idRetirada}
                            </Col>
                            <Col className="col-data-retirada" >
                              {retiradaUsu.dtRetirada}
                            </Col>
                            <Col className="col-total-retirada" >
                              {retiradaUsu.total}
                            </Col>
                            <Col className="col-total-retirada" >
                              <button className="btnVisulizar" type="submit"
                                onClick={(e) => visualizarProdutosRetirada(retiradaUsu.idRetirada, indexSel)}>
                                  {index === indexSel &&
                                    <EyeOutlined />
                                  }

                                  {index != indexSel &&
                                    <EyeInvisibleOutlined />
                                  }
                                  
                              </button>
                            </Col>
                          </Row>
                      ))
                    }
                </div>
              </div>
                }


                { temProdutosRetirada && (
                  <div className="tabela">
                  <div className="header-tabela"> 
                    <Row gutter={5}>
                      <Col className="col-id-retirada" >
                        <h4>Código</h4>
                      </Col>
                      <Col className="col-data-retirada" >
                        <h4>Nome</h4>
                      </Col>
                      <Col className="col-total-retirada" >
                        <h4>Valor</h4>
                      </Col>
                    </Row>
                  </div>
                  <div className="colunas-tabela">
                    {retiradaProdutoLista.map((retiradaPro, index) => (
                          <Row gutter={5}>
                            <Col className="col-id-retirada" >
                              {retiradaPro.produto?.idProduto}
                            </Col>
                            <Col className="col-data-retirada" >
                              {retiradaPro.produto?.nomeProduto}
                            </Col>
                            <Col className="col-total-retirada" >
                              {retiradaPro.produto?.valorProduto}
                            </Col>
                            
                          </Row>
                      ))
                    }
                </div>
              </div>
                )
                }


              </div>
            </Modal>

            <div className="funcoes">
                <Row gutter={2}>
                  <Col className="gutter-row" span={8}>
                    <Search placeholder="Cód. Barras..." value={inputText}
                      onSearch={buscarProduto} 
                      enterButton 
                      size='large'
                      onChange={onChang}/>
                  </Col>
                  <Col>
                    <Tooltip placement="rightTop" title={'Visuliazar minhas retiradas'}>
                      <button className="btnListar" type="submit"><FileSearchOutlined style={{ fontSize: '28px', color: 'var(--cor-primaria)' }} 
                          onClick={abrirModalListaRetiradas}/></button>
                    </Tooltip>
                  </Col>
                </Row>
             </div>  
             
            <form onSubmit={handleSubmit(inciarBaixaNoEstoque)}>
              <div className="tabela">
                <div className="header-tabela"> 
                  <Row gutter={5}>
                    <Col className="col-id-produto" >
                      <h4 className=''>#ID</h4>
                    </Col>
                    <Col className="col-nome-produto" >
                      <h4>Nome</h4>
                    </Col>
                    <Col className="col-quantidade-produto" >
                      <h4>Quantidade</h4>
                    </Col>
                    <Col className="col-acoes-produto" >
                      <h4>Ações</h4>
                    </Col>
                  </Row>
                </div>
                <div className="colunas-tabela">
                  {lista.map((prod, index) => (
                        <Row gutter={5}>
                          <Col className="col-id-produto" >
                            {prod.idProduto}
                          </Col>
                          <Col className="col-nome-produto" >
                            {prod.nomeProduto}
                          </Col>
                          <Col className="col-quantidade-produto" >
                            {prod.qtdParaDarBaixa}
                          </Col>
                          <Col className="col-acoes-produto" >
                            <button className="btnRemoverProd" 
                              onClick={() => removeProduto(index)}>
                                Remover
                            </button>
                          </Col>
                        </Row>
                    ))
                  }
              </div>
            </div>
            <div className="conteudo-cadastro">
              <div className="funcoes">
                <Row gutter={2}>
                  <Col className="gutter-row" span={4}>
                    <button className="btnRetirar" type="submit">Realizar baixa</button>
                  </Col>
                </Row>
              </div>  
            </div>
          </form>
        </>
    );
}

export default TabelaRetirarView;


