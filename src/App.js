import React from "react";

import style from "./App.module.scss";
import { Line } from "react-chartjs-2";

import { AbsoluteNumbers } from "./modules";

import data from "./prepareData.js";

function App() {
  return (
    <div className={style["App"]}>
      <h1 className={style["App__title"]}>
        Covid-19 <span className={style["App__title__locate"]}>Atibaia</span>
      </h1>
      <AbsoluteNumbers data={data.consolidated} />
      <Line data={data.general}></Line>
      <Line data={data.balance}></Line>
      <Line data={data.death}></Line>
      <Line data={data.hospital}></Line>
    </div>
  );
}

export default App;
