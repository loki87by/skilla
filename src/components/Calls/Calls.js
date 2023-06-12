import React, { useState, useEffect, useMemo } from "react";
import Call from "../Call/Call";
import Calendar from "../Calendar/Calendar";
import calendar from "../../assets/calendar.svg";
import arrow from "../../assets/arrow.svg";
import balance from "../../assets/balance.svg";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [dateSelectIsOpen, setDateSelectOpen] = useState(false);
  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("3 дня");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function showCalendar() {
    setDateSelectOpen(false);
    setCalendarOpen(true);
  }

  const calendarItems = useMemo(
    () => ["3 дня", "Неделя", "Месяц", "Год", "Указать даты"],
    []
  );

  function showDateSelect() {
    setDateSelectOpen(true);
  }

  useEffect(() => {
    const index = calendarItems.findIndex((i) => i === selectedItem);
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    if (index === 0) {
      const date = new Date(year, month, day - 2);
      setStartDate(date);
    }
    if (index === 1) {
      const date = new Date(year, month, day - 6);
      setStartDate(date);
    }
    if (index === 2) {
      const date = new Date(year, month - 1, day + 1);
      setStartDate(date);
    }
    if (index === 3) {
      const date = new Date(year - 1, month, day + 1);
      setStartDate(date);
    }
    setEndDate(today);
  }, [calendarItems, selectedItem]);

  useEffect(() => {
    if (startDate && endDate) {
      if (props.startDate !== startDate || props.endDate !== endDate) {
        props.setStartDate(startDate);
        props.setEndDate(endDate);
      }
    }
  });

  return (
    <section className="Calls">
      <article className="Calls_info">
        <div className="Calls_info-balance">
          <p className="Calls_info-balance-text">
            Баланс: <span style={{ color: "#122945" }}>272 ₽</span>
          </p>
          <img
            src={balance}
            alt="пополнить"
            className="Calls_info-balance-button"
          />
        </div>
        <div className="Calls_info-calendar">
          <svg
            src={arrow}
            onClick={showDateSelect}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="12"
            height="8"
            title="выбрать период"
            className="sprite Calls_info-calendar_arrow-left"
          >
            <use
              style={{ width: "12px", height: "8px" }}
              href={`${arrow}#arrow`}
            />
          </svg>
          <svg
            onClick={showDateSelect}
            src={calendar}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="16"
            height="18"
            title="выбрать период"
            className="sprite Calls_info-calendar_icon"
          >
            <use
              style={{ width: "16px", height: "18px" }}
              href={`${calendar}#calendar`}
            />
          </svg>
          <p onClick={showDateSelect} className="Calls_info-calendar_text">
            {selectedItem}
          </p>
          <svg
            src={arrow}
            onClick={showDateSelect}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="12"
            height="8"
            title="выбрать период"
            className="sprite Calls_info-calendar_arrow-right"
          >
            <use
              style={{ width: "12px", height: "8px" }}
              href={`${arrow}#arrow`}
            />
          </svg>
          <div
            className={`Calls_info-calendar_select ${
              dateSelectIsOpen && "Calls_info-calendar_select_opened"
            }`}
          >
            {calendarItems.map((item, index) => (
              <div
                key={index}
                className={`Calls_info-calendar_select-item ${
                  item.toLowerCase().includes(selectedItem.toLowerCase()) &&
                  "Calls_info-calendar_select-item_current"
                }`}
                onClick={
                  index !== 4
                    ? () => {
                        setSelectedItem(item);
                        setDateSelectOpen(false);
                      }
                    : showCalendar
                }
              >
                <p>{item}</p>
              </div>
            ))}
          </div>
          <Calendar
            calendarIsOpen={calendarIsOpen}
            startDate={props.startDate}
            endDate={props.endDate}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            setPeriod={props.setPeriod}
            setCalendarOpen={setCalendarOpen}
            setSelectedItem={setSelectedItem}
          />
        </div>
      </article>
      <article className="Calls_filters"></article>
      <ul className="Calls_content">
        <li>
          <div className="Calls_content-item">
            <div className="Calls_content-item__check">
              {clicked ? <input type="checkbox" disabled={true} /> : ""}
            </div>
            <p className="Calls_content-item__type">Тип</p>
            <p className="Calls_content-item__time">Время</p>
            <p className="Calls_content-item__worker">Сотрудник</p>
            <p className="Calls_content-item__call">Звонок</p>
            <p className="Calls_content-item__src">Источник</p>
            <p className="Calls_content-item__rating">Оценка</p>
            <p className="Calls_content-item__record">Длительность</p>
          </div>
        </li>
        {props.apiData !== null
          ? props.apiData.map((i) => (
              <Call key={i.id} data={i} setClicked={setClicked} />
            ))
          : ""}
      </ul>
    </section>
  );
}

export default Calls;
