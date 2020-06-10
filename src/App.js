import React from "react";

import style from "./App.module.scss";

import { AbsoluteNumbers } from "./modules";

function App() {
  return (
    <div className={style["App"]}>
      <h1 className={style["App__title"]}>
        Covid-19 <span className={style["App__title__locate"]}>Atibaia</span>
      </h1>
      <AbsoluteNumbers />
    </div>
  );
}

export default App;
