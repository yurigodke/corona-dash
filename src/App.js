import React, { PureComponent } from "react";
import classNames from "classnames";

import style from "./App.module.scss";
import { Line, Bar } from "react-chartjs-2";

import { AbsoluteNumbers, ChartBox, Footer, Maintenance } from "./modules";

import prepareData from "./prepareData.js";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataType: "raw"
    };
  }

  render() {
    const { dataType } = this.state;
    let content = <Maintenance />;

    if (window.dataInfo) {
      const data = new prepareData(window.dataInfo);
      const dataRaw = data.getRawData();
      const dataProjection = data.getProjectionsData();
      const dataConsolidation = data.getConsolidateData();

      const chartOptions = { responsive: true, maintainAspectRatio: false };

      const navigationGroup = (
        <div className={style["App__nav"]}>
          <div
            className={classNames(style["App__nav__btn"], {
              [style["App__nav__btn__active"]]: dataType === "raw"
            })}
            onClick={() => this.setState({ dataType: "raw" })}
          >
            Dados
          </div>
          <div
            className={classNames(style["App__nav__btn"], {
              [style["App__nav__btn__active"]]: dataType === "projection"
            })}
            onClick={() => this.setState({ dataType: "projection" })}
          >
            Projeções
          </div>
        </div>
      );

      if (dataType === "raw") {
        content = (
          <>
            <AbsoluteNumbers data={dataConsolidation} />
            {navigationGroup}
            <ChartBox title="Casos e óbitos diários">
              <Line data={dataRaw.general} options={chartOptions}></Line>
            </ChartBox>
            <ChartBox title="Casos diarios">
              <Bar data={dataRaw.daily} options={chartOptions}></Bar>
            </ChartBox>
            <ChartBox title="Casos semanais">
              <Bar data={dataRaw.weekly} options={chartOptions}></Bar>
            </ChartBox>
            <ChartBox title="Notificação de casos">
              <Line data={dataRaw.balance} options={chartOptions}></Line>
            </ChartBox>
            <ChartBox title="Óbitos e recuperados">
              <Line data={dataRaw.death} options={chartOptions}></Line>
            </ChartBox>
            <ChartBox title="Ocupação de leitos e pessoas em tratamento">
              <Line data={dataRaw.hospital} options={chartOptions}></Line>
            </ChartBox>
          </>
        );
      } else if (dataType === "projection") {
        content = (
          <>
            <AbsoluteNumbers data={dataConsolidation} />
            {navigationGroup}
            <ChartBox title="Casos projetados por óbito (Mortalidade de 0.7%)">
              <Line data={dataProjection.cases} options={chartOptions}></Line>
            </ChartBox>
          </>
        );
      }
    }

    return (
      <div className={style["App"]}>
        <h1 className={style["App__title"]}>
          Covid-19 <span className={style["App__title__locate"]}>Atibaia</span>
        </h1>
        {content}
        <Footer />
      </div>
    );
  }
}

export default App;
