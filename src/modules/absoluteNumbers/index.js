import React, { PureComponent } from "react";

import style from "./index.module.scss";

import { Box } from "../../components";

class AbsoluteNumbers extends PureComponent {
  render() {
    return (
      <div className={style["absoluteNumber"]}>
        <Box title="Casos confirmados" info={130} diff={12} />
        <Box title="Casos ativos" info={21} diff={15} />
        <Box title="Casos recuperados" info={102} diff={-20} />
        <Box title="Óbitos" info={4} diff={2} />
      </div>
    );
  }
}

export default AbsoluteNumbers;
