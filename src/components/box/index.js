import React from "react";
import PropTypes from "prop-types";

import style from "./index.module.scss";

const Box = ({ title, info, diff }) => {
  const diffScreen = diff.toString() + "%";
  const diffIndicator =
    diff > 0 ? (
      <i className={style["box__diff__negative"]}></i>
    ) : (
      <i className={style["box__diff__positive"]}></i>
    );
  return (
    <div className={style["box"]}>
      <div className={style["box__title"]}>{title}</div>
      <div className={style["box__info"]}>{info}</div>
      <div className={style["box__diff"]}>
        <span>{diffScreen}</span>
        {diffIndicator}
      </div>
    </div>
  );
};

Box.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.number.isRequired,
  diff: PropTypes.number
};

export default Box;
