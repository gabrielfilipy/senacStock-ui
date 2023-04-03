import React, { useState } from "react";
import { UserAddOutlined } from "@ant-design/icons";
import { Col, Row } from 'antd';
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Alert } from 'antd'; 
import * as yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { useFetch } from "../../../hooks/useFetch";

type Usuario = {
    nomeUsuario: string;
    emailUsuario: string;
    idUsuario: number;
}

const validaCampos = yup.object().shape({
    nomeUsuario: yup.string().required("O nome é obrigatório"),
    emailUsuario: yup.string().required("O E-mail é obrigatório")
});

function UsuarioFormView() {

    //pega o id da url (caso tenha).
    const { id } = useParams();
    const { response, register, handleSubmit, reset, setValue, errors } = 
        useFetch<Usuario>(`http://localhost:8080/usuario/buscar/${id}`, validaCampos);

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
    
    const onSubmit = (data: any) => axios.post("http://localhost:8080/usuario/cadastrar", data)
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
                message="Usuário cadastrado com sucesso!" 
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
                <h2 className="titulo-principal">Usuário <UserAddOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="conteudo-cadastro"> 
             
             <form onSubmit={handleSubmit(onSubmit)} >
                <Row gutter={16}>
                    <Col className="gutter-row" span={15}>
                        <div className="label-input">
                            <label>Nome:</label> 
                        </div>
                        <input className="input-form" type="text" {...register("nomeUsuario" )} />
                        <ErrorMessage
                            errors={errors}
                            name="nomeUsuario"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        /> 
                    </Col>
                    <Col className="gutter-row" span={9}>
                        <div className="label-input">
                            <label>E-mail:</label>
                        </div>
                        <input className="input-form" {...register('emailUsuario')} />
                        <ErrorMessage
                            errors={errors}
                            name="emailUsuario"
                            render={({ message }) => <p className="mensagem-error">{message}</p>}
                        />
                    </Col>
                </Row>

                <Row gutter={2}>
                    <Col className="gutter-row" span={4}>
                        <button className="btnCadastrar top" type="submit">Salvar</button>
                    </Col>
                    <Col className="gutter-row" span={3}>
                        <Link to="/usuario"><button className="btnVoltar top">Voltar</button></Link>
                    </Col>
                </Row>
                
            </form>

          </div>
        </div>
    )
}

export default UsuarioFormView;