import React from 'react';
import { PieChartOutlined } from '@ant-design/icons';
import { Row } from 'antd';
import Col from 'antd/lib/grid/col';
import { Chart } from "react-google-charts";
import './Home.view.css';

export const retirada = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const estoque = [
  ["Year", "Sales", "Expenses"],
  ["2004", 1000, 400],
  ["2005", 1170, 460],
  ["2006", 660, 1120],
  ["2007", 1030, 540],
];

function HomeView() {

    return (
        <div className="content top bottom">
          <Row gutter={1}>
            <Col className="gutter-row" span={11}>
              <h2 className="titulo-principal">Dashboard <PieChartOutlined style={{ fontSize: '28px', color: 'var(--cor-titulo)' }} /></h2>
            </Col>
          </Row>

          <div className="content-flex">
            <div className="child">
              <Chart
                  chartType="PieChart"
                  data={retirada}
                  width={"100%"}
                  height="400px"
                />
            </div>
            <div className="child">
              <Chart
                chartType="LineChart"
                width="100%"
                height="400px"
                data={estoque}
              />
            </div>
          </div>

        </div>
      );
}

export default HomeView;