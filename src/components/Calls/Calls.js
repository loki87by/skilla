import React, { useState, useCallback } from "react";
import Call from "../Call/Call";
import Calendar from "../Calendar/Calendar";
import calendar from "../../assets/calendar.svg";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [calendarIsOpen, setCalendarOpen] = useState(false);

  function showCalendar() {
    setCalendarOpen(true);
    props.setStartDate(null);
  }

  const periodTextHandler = useCallback(() => {
    let period = props.period;
    if (period === 1) {
      return "1 день";
    } else if (period < 5) {
      return `${period} дня`;
    } else {
      return `${period} дней`;
    }
  }, [props.period]);

  return (
    <section className="Calls">
      <article className="Calls_info">
        <div className="Calls_info-balance"></div>
        <div className="Calls_info-calendar" onClick={showCalendar}>
          <svg src={calendar} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="16" height="18" title="выбрать период"
              className="Calls_info-calendar_icon">
            <use style={{ width: "16px", height: "18px"}}
              href={`${calendar}#calendar`}
           />
          </svg>
          <p className="Calls_info-calendar_text">{periodTextHandler()}</p>
          <Calendar
            calendarIsOpen={calendarIsOpen}
            startDate={props.startDate}
            endDate={props.endDate}
            setStartDate={props.setStartDate}
            setEndDate={props.setEndDate}
            setPeriod={props.setPeriod}
            setCalendarOpen={setCalendarOpen}
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
