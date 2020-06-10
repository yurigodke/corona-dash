import React from "react";
import PropTypes from "prop-types";

import style from "./index.module.scss";

import { Box } from "../../components";

const AbsoluteNumbers = ({ data }) => {
  return (
    <div className={style["absoluteNumber"]}>
      <Box title="Casos confirmados" {...data.confirmed} color="#0fb9b1" />
      <Box title="Casos ativos" {...data.active} color="#fa8231" />
      <Box
        title="Casos recuperados"
        {...data.recovered}
        color="#26de81"
        upIsGood={true}
      />
      <Box title="Óbitos" {...data.death} color="#eb3b5a" />
    </div>
  );
};

AbsoluteNumbers.propTypes = {
  fata: PropTypes.object
};

export default AbsoluteNumbers;
