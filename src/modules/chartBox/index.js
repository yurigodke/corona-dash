import React from "react";
import PropTypes from "prop-types";

import style from "./index.module.scss";

const ChartBox = ({ title, children }) => {
  return (
    <div className={style["chartBox"]}>
      <h2 className={style["chartBox__title"]}>{title}</h2>
      {children}
    </div>
  );
};

ChartBox.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};

export default ChartBox;
