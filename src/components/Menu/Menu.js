import React from "react";
import logo from "../../assets/logo.svg";
import total from "../../assets/total.svg";
import orders from "../../assets/orders.svg";
import messages from "../../assets/messages.svg";
import phone from "../../assets/phone.svg";
import contragents from "../../assets/contragents.svg";
import docs from "../../assets/docs.svg";
import performers from "../../assets/performers.svg";
import reports from "../../assets/reports.svg";
import wiki from "../../assets/wiki.svg";
import settings from "../../assets/settings.svg";
import plus from "../../assets/plus.svg";
import exclamation from "../../assets/exclamation.svg";
import "./Menu.css";

function Menu() {
  const menuItems = [
    { img: total, title: "Итоги" },
    { img: orders, title: "Заказы" },
    { img: messages, title: "Сообщения" },
    { img: phone, title: "Звонки", selected: true },
    { img: contragents, title: "Контрагенты" },
    { img: docs, title: "Документы" },
    { img: performers, title: "Исполнители" },
    { img: reports, title: "Отчеты" },
    { img: wiki, title: "База знаний" },
    { img: settings, title: "Настройки" },
  ];

  return (
    <aside className="Menu">
      <img src={logo} alt="logo" className="Menu-logo" />
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`Menu-item ${item.selected && "Menu-item_selected"}`}
        >
          <div className="Menu-item_image">
            <img src={item.img} alt={item.title} />
          </div>
          <p>{item.title}</p>
        </div>
      ))}
      <button disabled={true} className="Menu-button">
        <p>Добавить заказ</p>
        <img src={plus} alt="Добавить заказ" />
      </button>
      <button disabled={true} className="Menu-button">
        <p></p>
        <p>Оплата</p>
        <img src={exclamation} alt="Оплата" />
      </button>
    </aside>
  );
}

export default Menu;
