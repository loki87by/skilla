import React, { useState, useEffect } from "react";
import { DATE_OPTIONS, CALENDAR_ITEMS } from "../../../../utils/consts";
import Calendar from "../Calendar/Calendar";
import Sprite from "../../../Sprite/Sprite";
import calendar from "../../../../assets/calendar.svg";
import arrow from "../../../../assets/arrow.svg";
import "./Timelaps.css";

function Timelaps(props) {
  const [dateSelectIsOpen, setDateSelectOpen] = useState(false);
  const [calendarIsOpen, setCalendarOpen] = useState(false);
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

  function showDateSelect() {
    setDateSelectOpen(true);
  }

  useEffect(() => {
    const index = CALENDAR_ITEMS.findIndex((i) => i === selectedItem);
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
  }, [selectedItem]);

  return (
    <div className="Timelaps">
      <Sprite
        src={arrow}
        click={showDateSelect}
        style={{ transform: "rotate(270deg)" }}
        width="12"
        height="8"
        title="выбрать период"
        id="arrow"
      />
      <Sprite
        src={calendar}
        click={showDateSelect}
        class="Timelaps__icon"
        width="16"
        height="18"
        title="выбрать период"
        id="calendar"
      />
      <p onClick={showDateSelect} className="Timelaps__text">
        {selectedItem}
      </p>
      <Sprite
        src={arrow}
        click={showDateSelect}
        style={{ transform: "rotate(90deg)" }}
        width="12"
        height="8"
        title="выбрать период"
        id="arrow"
      />
      <div
        className={`Timelaps__select ${
          dateSelectIsOpen && "Timelaps__select_opened"
        }`}
      >
        {CALENDAR_ITEMS.map((item, index) => (
          <div
            key={index}
            className={`Timelaps__select-item ${
              item.toLowerCase().includes(selectedItem.toLowerCase()) &&
              "Timelaps__select-item_current"
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
            {index === 4 ? (
              <>
                <p>
                  {props.startDate && props.endDate
                    ? showCurrentDates()
                    : "__.__.__-__.__.__"}
                </p>
                <Sprite
                  src={calendar}
                  class="Timelaps__select-item_icon"
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
        resetDates={resetDates}
        setCalendarOpen={setCalendarOpen}
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}

export default Timelaps;
