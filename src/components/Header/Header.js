import React from "react";
import { HEADER_DATE_OPTIONS } from "../../utils/consts";
import Sprite from "../Sprite/Sprite";
import search from "../../assets/search.svg";
import arrow from "../../assets/arrow.svg";
import "./Header.css";

function Header() {
  const today = new Date();
  const stringToday = new Intl.DateTimeFormat(
    "ru-RU",
    HEADER_DATE_OPTIONS
  ).format(today);
  const analitics = [
    { title: "Новые звонки\u00A0", content: "20 из 30 шт", color: "#28a879" },
    { title: "Качество разговоров\u00A0", content: "40%", color: "#ffd500" },
    { title: "Конверсия в заказ\u00A0", content: "67%", color: "#ea1a4f" },
  ];

  return (
    <header className="Header">
      <div className="Header-block">
        <time>{stringToday.split(".")[0]}</time>
        {analitics.map((item, index) => (
          <div key={index} className="Header-analitics">
            <div className="Header-analitics_text">
              <p>{item.title}</p>
              <p style={{ color: item.color }}>{item.content}</p>
            </div>
            <div className="Header-analitics_progress">
              <div
                style={{ width: item.content, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="Header-block">
        <Sprite
          src={search}
          class="Header-block-search"
          width="16"
          height="16"
          title="искать"
          id="search"
        />
        <div className="Header-block-user">
          <p className="Header-block-user_name">
            ИП Сидорова Александра Михайловна
          </p>
        </div>
        <Sprite
          src={arrow}
          class="Header-block-arrow"
          width="12"
          height="8"
          title="выбрать"
          id="arrow"
        />
        <img src="" alt="аватар" className="Header-block-user_avatar" />
        <Sprite
          src={arrow}
          class="Header-block-arrow"
          width="12"
          height="8"
          title="выбрать"
          id="arrow"
        />
      </div>
    </header>
  );
}

export default Header;
