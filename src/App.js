import React from "react";

import style from "./App.module.scss";
import { Line } from "react-chartjs-2";

import { AbsoluteNumbers, ChartBox, Footer, Maintenance } from "./modules";

import getData from "./prepareData.js";

function App() {
  let content = <Maintenance />;

  if (window.dataInfo) {
    const data = getData(window.dataInfo);

    content = (
      <>
        <AbsoluteNumbers data={data.consolidated} />
        <ChartBox title="Casos e óbitos diários">
          <Line data={data.general}></Line>
        </ChartBox>
        <ChartBox title="Notificação de casos">
          <Line data={data.balance}></Line>
        </ChartBox>
        <ChartBox title="Óbitos e recuperados">
          <Line data={data.death}></Line>
        </ChartBox>
        <ChartBox title="Ocupação de leitos e pessoas em tratamento">
          <Line data={data.hospital}></Line>
        </ChartBox>
      </>
    );
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

export default App;
