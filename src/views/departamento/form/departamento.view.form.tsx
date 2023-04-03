import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Input, Row } from "antd";
import Col from "antd/lib/grid/col";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";
import { Alert } from 'antd'; 
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

type Departamento = {
    nomeDepartamento: string;
    descricaoDepartamento: string;
    idDepartamento: number;
}

const validaCampos = yup.object().shape({
    nomeDepartamento: yup.string().required("O nome é obrigatório"),
    descricaoDepartamento: yup.string()
});

const { TextArea } = Input;

function DepartamentoViewForm() {

    //pega o id da url (caso tenha).
    const { id } = useParams();
    const { response, register, handleSubmit, reset, setValue, errors } = 
        useFetch<Departamento>(`http://localhost:8080/departamento/buscar/${id}`, validaCampos);

    const [ showAlert , setAlert ] = useState({
            success: false,
            alert: false,
            error: false,
            message: '',
    });
    
    const timer = setTimeout(() => {
        setAlert({
            success: false,
            alert: false,
            error: false,
            message: '',
        });
    }, 30000);

    const onSubmit = (data: any) => axios.post("http://localhost:8080/departamento/cadastrar", data)
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

    return (
        <div className="content top bottom">

            {showAlert.success && (
            <Alert 
                className="mensagem" 
                message="Departamento cadastrado com sucesso!" 
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
                <h2 className="titulo-principal">Departmento <PlusCircleOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="conteudo-cadastro"> 
            <form onSubmit={handleSubmit(onSubmit)} >
                <Row gutter={16}>
                    <Col className="gutter-row" span={11}>
                        <div className="label-input">
                            <label>Nome:</label>
                        </div>
                        <input className="input-form" type="text" placeholder="Nome..." {...register("nomeDepartamento" )} />
                        <ErrorMessage
                            errors={errors}
                            name="nomeDepartamento"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        /> 
                    </Col>

                    <Col className="gutter-row" span={22}>
                        <div className="label-input">
                            <label>Descrição:</label>
                        </div>
                        <textarea className="input-form" rows={4} placeholder="Máximo de caracter é 255..." maxLength={255} 
                            {...register("descricaoDepartamento" )}/>
                    </Col>
                    
                </Row>

                <Row gutter={22}>
                    <Col className="gutter-row" span={4}>
                        <button className="btnCadastrar top" type="submit">Salvar</button>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Link to="/departamento"><button className="btnVoltar top">Voltar</button></Link>
                    </Col>
                </Row>
                
            </form>

          </div>
        </div>
    );

}

export default DepartamentoViewForm;