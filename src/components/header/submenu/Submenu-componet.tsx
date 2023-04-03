import { UserOutlined } from "@ant-design/icons";
import React from "react";
import '../Header.component.css';

function SubmenuComponent() {
    return (
        <>
            <div className="submenu">
                <div className="content">
                    <h2 className="right"><UserOutlined /> Gabriel Filipy da Silva Correa</h2>
                    <div className="clear"></div>
                </div>
            </div>
        </>
    );
}

export default SubmenuComponent;