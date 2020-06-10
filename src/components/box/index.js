import React from "react";
import PropTypes from "prop-types";

import style from "./index.module.scss";

const Box = ({ title, value, diff, color = null, upIsGood = false }) => {
  const diffScreen = diff.toString() + "%";
  let diffIndicator = null;

  if (diff !== 0) {
    if (upIsGood) {
      diffIndicator =
        diff > 0 ? (
          <i className={style["box__diff__negative__invert"]}></i>
        ) : (
          <i className={style["box__diff__positive__invert"]}></i>
        );
    } else {
      diffIndicator =
        diff > 0 ? (
          <i className={style["box__diff__negative"]}></i>
        ) : (
          <i className={style["box__diff__positive"]}></i>
        );
    }
  }

  const infoCustomStyle = {};
  if (color) {
    infoCustomStyle.color = color;
  }
  return (
    <div className={style["box"]}>
      <div className={style["box__title"]}>{title}</div>
      <div className={style["box__info"]} style={infoCustomStyle}>
        {value}
      </div>
      <div className={style["box__diff"]}>
        <span>{diffScreen}</span>
        {diffIndicator}
      </div>
    </div>
  );
};

Box.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  diff: PropTypes.number,
  color: PropTypes.string,
  upIsGood: PropTypes.bool
};

export default Box;
