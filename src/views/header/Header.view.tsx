import React from 'react';

import './Header.view.css';
import { BrowserRouter as Router, Link, Routes, Route  } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <Link to="/usuario">Usuário</Link>
      ),
    },
    {
        key: '1',
        label: (
          <Link to="/permissoes">Permissões</Link>
        ),
    }
    
  ];

function HeaderView() {
    return (
        <div className="header">
            <div className="content">
                <div className="logo left">
                    <Link to="/home">SenacStock</Link>
                </div>
                <nav className="desktop right">
                    <ul className="desktop-ul">
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/produto">Produto</Link></li>
                        <li><Link to="/departamento">Departamento</Link></li>
                        <li><Link to="/retirar">Retirar</Link></li>
                        <li>
                            <Dropdown menu={{ items }} trigger={['click']}>
                                <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    <a href="#">Gestão</a>
                                    <DownOutlined />
                                </Space>
                                </a>
                            </Dropdown>
                        </li>
                    </ul> 
                </nav>
                <nav className="mobile right">
                    <ul >
                        <li><Link to="/home">Home</Link></li>
                        <li><Link to="/produto">Produto</Link></li>
                        <li><Link to="/usuario">Usuário</Link></li>
                    </ul>
                </nav>
                <div className="clear"></div>
            </div>
        </div>
    );
}

export default HeaderView;