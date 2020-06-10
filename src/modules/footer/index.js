import React from "react";

import style from "./index.module.scss";

const Footer = () => {
  return (
    <div className={style["footer"]}>
      <div>
        Desenvolvido por{" "}
        <strong>
          <a href="mailto:talkto@yurigodke.com">Yuri Godke</a>
        </strong>
      </div>
      <div>
        Fonte{" "}
        <a href="http://www.prefeituradeatibaia.com.br/categoria/saude/">
          Prefeitura de Atibaia
        </a>
      </div>
    </div>
  );
};

export default Footer;
