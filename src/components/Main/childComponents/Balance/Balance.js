import React, { useState } from "react";
import Sprite from "../../../Sprite/Sprite";
import balance from "../../../../assets/balance.svg";
import cross from "../../../../assets/cross.svg";
import "./Balance.css";

function Balance() {
  const [cashInputIsOpen, setCashInputOpen] = useState(false);
  const [cashError, setCashError] = useState(false);
  const [cashValue, setCashValue] = useState(3850);

  function changeCashValue(val) {
    setCashValue(val);

    if (val === "") {
      setCashError(true);
    } else {
      setCashError(false);
    }
  }

  function closeCashInput() {
    setCashInputOpen(false);
  }

  function showCashInput() {
    setCashInputOpen(true);
  }

  return (
    <div className="Balance">
      <p className="Balance__text">
        Баланс: <span>272 ₽</span>
      </p>
      <img
        src={balance}
        onClick={showCashInput}
        alt="пополнить"
        title="пополнить"
        className="Balance__button"
      />
      {cashInputIsOpen ? (
        <div className="Balance__popup">
          <Sprite
            src={cross}
            click={closeCashInput}
            class="Balance__popup_close"
            width="14"
            height="14"
            title="закрыть"
            id="cross"
          />
          <div className="Balance__popup_data">
            <input
              className={`Balance__popup_input ${
                cashError && "Balance__popup_error"
              }`}
              id="balance-input"
              type="number"
              value={cashValue}
              onChange={(e) => {
                changeCashValue(e.target.value);
              }}
            />
            <label
              className={`Balance__popup_label ${
                cashError && "Balance__popup_error"
              }`}
              htmlFor="balance-input"
            >
              ₽
            </label>
            {cashError ? (
              <span className="Balance__popup_alert">"Введите сумму"</span>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Balance;
