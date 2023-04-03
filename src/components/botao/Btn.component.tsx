import React, { Component } from 'react';
import './Btn.component.css';

function BtnComponent(component: Component) {
    return (
        <Component className="btnCadastrar" type='button'>Novo</Component> 
    );
}

export default BtnComponent;