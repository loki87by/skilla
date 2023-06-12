import React from "react";
import { DATE_OPTIONS } from "../../utils/consts";
import search from "../../assets/search.svg";
import arrow from "../../assets/arrow.svg";
import "./Header.css";

function Header() {
  const today = new Date();
  const stringToday = new Intl.DateTimeFormat("ru-RU", DATE_OPTIONS).format(
    today
  );
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
        <svg
          src={search}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16"
          height="16"
          title="искать"
          className="Header-block-search"
        >
          <use
            className="sprite"
            style={{ width: "16px", height: "16px" }}
            href={`${search}#search`}
          />
        </svg>
        <div className="Header-block-user">
          <p className="Header-block-user_name">
            ИП Сидорова Александра Михайловна
          </p>
        </div>
        <svg
          src={arrow}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16"
          height="16"
          title="искать"
          className="Header-block-arrow"
        >
          <use
            className="sprite"
            style={{ width: "12px", height: "8px" }}
            href={`${arrow}#arrow`}
          />
        </svg>
        <img src="" alt="аватар" className="Header-block-user_avatar" />
        <svg
          src={arrow}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="16"
          height="16"
          title="искать"
          className="Header-block-arrow"
        >
          <use
            className="sprite"
            style={{ width: "12px", height: "8px" }}
            href={`${arrow}#arrow`}
          />
        </svg>
      </div>
    </header>
  );
}

export default Header;
