import React, { useState, useMemo, useEffect } from "react";
import { DATE_OPTIONS } from "../../utils/consts";
import Calendar from "../Calendar/Calendar";
import Sprite from "../Sprite/Sprite";
import calendar from "../../assets/calendar.svg";
import arrow from "../../assets/arrow.svg";
import balance from "../../assets/balance.svg";
import cross from "../../assets/cross.svg";
import "./Info.css";

function Info(props) {
  const [dateSelectIsOpen, setDateSelectOpen] = useState(false);
  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const [cashInputIsOpen, setCashInputOpen] = useState(false);
  const [cashError, setCashError] = useState(false);
  const [cashValue, setCashValue] = useState(3850);
  const [selectedItem, setSelectedItem] = useState("3 дня");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function resetDates() {
    setStartDate(null);
    setEndDate(null);
  }

  useEffect(() => {
    if (startDate && endDate) {
      if (props.startDate !== startDate || props.endDate !== endDate) {
        props.setStartDate(startDate);
        props.setEndDate(endDate);
      }
    }
  });

  const showCurrentDates = () => {
    const stringStart = new Intl.DateTimeFormat("ru-RU", DATE_OPTIONS)
      .format(props.startDate)
      .split(",")[1]
      .slice(0, 9);
    const stringEnd = new Intl.DateTimeFormat("ru-RU", DATE_OPTIONS)
      .format(props.endDate)
      .split(",")[1]
      .slice(0, 9);
    return `${stringStart}-${stringEnd}`;
  };

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
    if (index === 4) {
      setStartDate(null);
      setEndDate(null);
    }
  }, [calendarItems, selectedItem]);

  function showCashInput() {
    setCashInputOpen(true);
  }

  function closeCashInput() {
    setCashInputOpen(false);
  }

  function changeCashValue(val) {
    setCashValue(val);
    if (val === "") {
      setCashError(true);
    } else {
      setCashError(false);
    }
  }

  return (
    <article className="Info">
      <div className="Info__balance">
        <p className="Info__balance-text">
          Баланс: <span>272 ₽</span>
        </p>
        <img
          src={balance}
          onClick={showCashInput}
          alt="пополнить"
          title="пополнить"
          className="Info__balance-button"
        />
        {cashInputIsOpen ? (
          <div className="Info__balance_add-block">
            <Sprite
              src={cross}
              click={closeCashInput}
              class="Info__balance_add-block_close"
              width="14"
              height="14"
              title="закрыть"
              id="cross"
            />
            <div className="Info__balance_add-block_data">
              <input
                className={`Info__balance_add-block_input ${
                  cashError && "Info__balance_add-block_error"
                }`}
                id="balance-input"
                type="number"
                value={cashValue}
                onChange={(e) => {
                  changeCashValue(e.target.value);
                }}
              />
              <label
                className={`Info__balance_add-block_label ${
                  cashError && "Info__balance_add-block_error"
                }`}
                htmlFor="balance-input"
              >
                ₽
              </label>
              {cashError ? <span className="Info__balance_add-block_alert">
                "Введите сумму"
              </span> : ""}
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="Info__calendar">
        <Sprite
          src={arrow}
          click={showDateSelect}
          class="Info__calendar_arrow-left"
          width="12"
          height="8"
          title="выбрать период"
          id="arrow"
        />
        <Sprite
          src={calendar}
          click={showDateSelect}
          class="Info__calendar_icon"
          width="16"
          height="18"
          title="выбрать период"
          id="calendar"
        />
        <p onClick={showDateSelect} className="Info__calendar_text">
          {selectedItem}
        </p>
        <Sprite
          src={arrow}
          click={showDateSelect}
          class="Info__calendar_arrow-right"
          width="12"
          height="8"
          title="выбрать период"
          id="arrow"
        />
        <div
          className={`Info__calendar_select ${
            dateSelectIsOpen && "Info__calendar_select_opened"
          }`}
        >
          {calendarItems.map((item, index) => (
            <div
              key={index}
              className={`Info__calendar_select-item ${
                item.toLowerCase().includes(selectedItem.toLowerCase()) &&
                "Info__calendar_select-item_current"
              }`}
              onClick={
                index !== 4
                  ? () => {
                      props.setPeriod(NaN);
                      setSelectedItem(item);
                      setDateSelectOpen(false);
                    }
                  : showCalendar
              }
            >
              <p>{item}</p>
              {index === 4 ? (
                <>
                  <p>
                    {props.startDate && props.endDate && !isNaN(props.period)
                      ? showCurrentDates()
                      : "__.__.__-__.__.__"}
                  </p>
                  <Sprite
                    src={calendar}
                    class="Info__calendar_select-item_icon"
                    width="16"
                    height="18"
                    title="выбрать период"
                    id="calendar"
                  />
                </>
              ) : (
                ""
              )}
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
          resetDates={resetDates}
          setCalendarOpen={setCalendarOpen}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </article>
  );
}

export default Info;
