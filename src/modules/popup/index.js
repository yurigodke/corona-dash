import React, { PureComponent } from "react";

import style from "./index.module.scss";

class Footer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      open: true
    };
  }

  render() {
    const { open } = this.state;

    const popupElm = open ? (
      <div className={style["popup"]}>
        <div className={style["popup__content"]}>
          <div className={style["popup__content__text"]}>
            Infelizmente a Prefeitura de Atibaia, não está mais disponibilizando
            os dados de internados de maneira separada (números de internados em
            enfermaria e UTI separadamente), por conta disso os números
            correspondentes estarão como 0. Porém continuarei atualizando os
            dados que forem disponibilizados.
          </div>
          <button
            className={style["popup__content__button"]}
            onClick={() =>
              this.setState(prevState => {
                return {
                  open: !prevState.open
                };
              })
            }
          >
            Ver os dados
          </button>
        </div>
      </div>
    ) : null;

    return popupElm;
  }
}

export default Footer;
