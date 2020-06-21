import React from "react";
import PropTypes from "prop-types";

import style from "./index.module.scss";

import { Box } from "../../components";

const AbsoluteNumbers = ({ data }) => {
  return (
    <div className={style["absoluteNumber"]}>
      <Box title="Confirmados" {...data.confirmed} color="#0fb9b1" />
      <Box title="Em recuperação" {...data.active} color="#4b7bec" />
      <Box title="Em enfermaria" {...data.nursery} color="#fa8231" />
      <Box title="Em UTI" {...data.icu} color="#eb3b5a" />
      <Box
        title="Recuperados"
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
