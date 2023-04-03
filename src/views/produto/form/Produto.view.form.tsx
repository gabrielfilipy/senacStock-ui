import React, { useEffect, useState } from "react";
import { Alert, Col, Row } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import type { DatePickerProps } from 'antd';
import 'dayjs/locale/zh-cn';
import { DatePicker } from 'antd';
import { InputNumber, Select } from 'antd';
import useDepartamento from "../../../hooks/useDepartamento";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { useForm } from "react-hook-form";

type Produto = {
    nomeProduto: string;
    idProduto: number;
    descProduto: string;
    qtdProduto: number;
    valorProduto: string;
    dtVencimentoProd: string;
    departamento: Departamento;
}

type Departamento = {
    idDepartamento: any;
    nomeDepartamento: string;
}

const validaCampos = yup.object().shape({
    nomeProduto: yup.string().required("O nome é obrigatório"),
    descProduto: yup.string().required("A descrição é obrigatória"),
    dtVencimentoProd: yup.string().required("A data de vencimento é obrigatória")
});

function ProdutoFormView() {

    const dateFormat = "YYYY-MM-DD HH:mm:ss.ssssssZZ";
    const { register, handleSubmit, setValue, getValues, formState: { errors }, reset } = useForm({
        resolver: yupResolver(validaCampos)
    })
    const { departamento, setDepartamento, fecthDepartamento } = useDepartamento(0);
    //pega o id da url (caso tenha).
    const { id } = useParams();
    const [prod, setProd] = useState({
        idDepartamento: 0
    });

    const [ showAlert , setAlert ] = useState({
            success: false,
            alert: false,
            error: false,
            message: '',
    });

    const onChangeQtd = (value: any) => {
        setValue('qtdProduto', value);
    };

    function handleChange (e:any) {
        setProd({
            idDepartamento: e.target.value
        })
        //setValue( 'departamento', { nomeDepartamento: value });
        setValue( 'departamento', { idDepartamento: e.target.value });
        
        //TODO:Pegar usuario dinamicamente
        setValue( 'usuario', { idUsuario: '1' });
    };
      
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        setValue('dtVencimentoProd', dateString);
    };
    
    const timer = setTimeout(() => {
        setAlert({
            success: false,
            alert: false,
            error: false,
            message: '',
        });
    }, 50000);

    const cadastrar = (data: any) => axios.post("http://localhost:8080/produto/cadastrar", data)
        .then((response) => {
        reset(data);
            setAlert({
                success: true,
                alert: false,
                error: false,
                message: '',
            });
        })
        .catch(error => {
            setAlert({
                success: false,
                alert: false,
                error: true,
                message: 'Error: ' + error
            });
        });

        useEffect(() => {
            fecthDepartamento(0, '');
    
            axios.get(`http://localhost:8080/produto/buscar/${id}`)
                .then((response) => {
                    setProd({
                        idDepartamento: response.data.departamento.idDepartamento
                    })
                    reset(response.data);
                }
            )
            .catch((err) => {
                console.log("ops! ocorreu um erro" + err);
            });
        }, []);

    return (
        <div className="content top bottom">
            {showAlert.success && (
            <Alert 
                className="mensagem" 
                message="Produto cadastrado com sucesso!" 
                type="success" 
                showIcon />
            )}

            {showAlert.error && (
                <Alert 
                    className="mensagem" 
                    message={showAlert.message} 
                    type="error" 
                    showIcon />
            )}

          <Row gutter={16}>
            <Col className="gutter-row" span={11}>
                <h2 className="titulo-principal">Produto <PlusCircleOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="conteudo-cadastro"> 
            <form onSubmit={handleSubmit(cadastrar)} >
                <Row gutter={16}>
                    <Col className="gutter-row" span={11}>
                        <div className="label-input">
                            <label>Nome:</label>
                        </div>
                        <input className="input-form" type="text" placeholder="Nome..." {...register("nomeProduto" )} />
                        <ErrorMessage
                            errors={errors}
                            name="nomeProduto"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        />
                    </Col>
                    <Col className="gutter-row" span={4}>
                        <div className="label-input" >
                            <label>Data vencimento:</label>
                        </div>
                        <DatePicker format={dateFormat} onChange={onChangeDate} size="large" style={{ marginTop: '8px' }}/>
                        <ErrorMessage
                            errors={errors}
                            name="dtVencimentoProd"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        />
                    </Col>
                    <Col className="gutter-row" span={3} >
                        <div className="label-input">
                            <label>Quantidade:</label>
                        </div>
                        <input className="input-form" type="text" placeholder="Nome..." {...register("qtdProduto" )} />
                    </Col>
                    <Col className="gutter-row" span={11} >
                        <div className="label-input">
                            <label>Departamento:</label>
                        </div>
                        <select className="input-form" value={prod.idDepartamento} onChange={handleChange}>
                            {
                                departamento.lista.map((d) => (
                                    <option value={d['idDepartamento']} key={d['idDepartamento']}>{d['nomeDepartamento']}</option>
                            ))}
                        </select>

                    </Col>
                    <Col className="gutter-row" span={5}>
                        <div className="label-input">
                            <label>Valor:</label>
                        </div>
                        <input className="input-form" type="text" placeholder="Nome..." {...register("valorProduto" )} />
                        <ErrorMessage
                            errors={errors}
                            name="valorDepartamento"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        />
                    </Col>
                    <Col className="gutter-row" span={22}>
                        <div className="label-input">
                            <label>Descrição:</label>
                        </div>
                        <textarea className="input-form" rows={4} placeholder="Máximo de caracter é 255..." maxLength={255} 
                            {...register("descProduto" )}/>
                        <ErrorMessage
                            errors={errors}
                            name="descProduto"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        />
                    </Col>
                </Row>

                <Row gutter={2}>
                    <Col className="gutter-row" span={4}>
                        <button className="btnCadastrar top" type="submit">Salvar</button>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Link to="/produto"><button className="btnVoltar top">Voltar</button></Link>
                    </Col>
                </Row>
                
            </form>

          </div>
        </div>
    );

}

export default ProdutoFormView;