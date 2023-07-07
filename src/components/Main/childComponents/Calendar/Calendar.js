import React, { useState, useEffect, useCallback } from "react";
import { MONTHS, WEEK_DAYS } from "../../../../utils/consts";
import Sprite from "../../../Sprite/Sprite";
import arrow from "../../../../assets/arrow.svg";
import "./Calendar.css";

function Calendar(props) {
  const [rows, setRows] = useState(0);
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(5);
  const [currentDay, setCurrentDay] = useState(NaN);
  const [startDate, setStartDate] = useState(null);
  const [matrix, setMatrix] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const today = new Date();

  const getLastDayOfMonth = useCallback(() => {
    const lastDate = new Date(currentYear, currentMonth + 1, 0);
    return lastDate.getDate();
  }, [currentMonth, currentYear]);

  const setDates = useCallback(() => {
    let firstDayInMonth;
    const weeksInMouth = () => {
      const firstDate = new Date(currentYear, currentMonth, 1);
      const number = firstDate.getDay();

      if (number === 0) {
        firstDayInMonth = 6;
      } else {
        firstDayInMonth = number - 1;
      }
      return Math.ceil((getLastDayOfMonth() + firstDayInMonth) / 7);
    };

    if (weeksInMouth() !== rows) {
      setRows(weeksInMouth());
      const tempArray = [];

      for (let i = 0; i < weeksInMouth() * 7; i++) {
        if (
          i < firstDayInMonth ||
          i > firstDayInMonth + getLastDayOfMonth() - 1
        ) {
          tempArray.push(0);
        } else {
          tempArray.push(i - firstDayInMonth + 1);
        }
      }
      const monthDays = [];

      for (let i = 0; i < weeksInMouth(); i++) {
        const arr = [];

        for (let j = 0; j < 7; j++) {
          arr.push(tempArray[i * 7 + j]);
        }
        monthDays.push(arr);
      }
      setMatrix(monthDays);
    }
  }, [currentMonth, currentYear, getLastDayOfMonth, rows]);

  useEffect(() => {
    setDates();
  }, [currentMonth, currentYear, getLastDayOfMonth, rows, setDates]);

  function setCurrentDate(day) {
    const date = new Date(currentYear, currentMonth, day);

    if (startDate === null) {
      setStartDate(date);
      props.setStartDate(date);
      props.setEndDate(null);
      setSelectedDates([day]);
    } else {
      const sorted = [date, startDate].sort(
        (a, b) => new Date(a) - new Date(b)
      );
      props.setStartDate(sorted[0]);
      props.setEndDate(sorted[1]);
      setStartDate(null);
      props.setCalendarOpen(false);
      props.setSelectedItem("Даты");
      props.resetDates();
      setSelectedDates([]);
    }
  }

  function checkGlobalDate(arg) {
    checkMonth();

    if (arg === "up") {
      const date = new Date(currentYear, currentMonth, getLastDayOfMonth());

      if (date >= today) {
        return;
      } else {
        setRows(0);
        setCurrentMonth(currentMonth + 1);
      }
    }

    if (arg === "down") {
      setRows(0);

      if (currentMonth - 1 < 0) {
        setCurrentYear(currentYear - 1);
        setCurrentMonth(11);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }

    setDates();
  }

  function disableWrongDays(d) {
    const year = today.getFullYear();
    const month = today.getMonth();

    if (d === 0) {
      return false;
    }

    if (currentYear !== year || currentMonth !== month) {
      return true;
    } else {
      if (today.getDate() < d) {
        return false;
      } else {
        return true;
      }
    }
  }

  const checkMonth = useCallback(() => {
    if (startDate === null) {
      return;
    }

    if (currentMonth > startDate.getMonth()) {
      setCurrentDay(1);
    } else if (currentMonth < startDate.getMonth()) {
      setCurrentDay(getLastDayOfMonth());
    } else {
      setCurrentDay(startDate.getDate());
    }
  }, [currentMonth, getLastDayOfMonth, startDate]);

  function checkSelection(day) {
    if (!startDate) {
      return;
    } else {
      checkMonth();
      const sorted = [currentDay, day].sort((a, b) => {
        return a - b;
      });
      const arr = [];
      for (let i = sorted[0]; i <= sorted[1]; i++) {
        if (!arr.includes(i)) {
          const date = new Date(currentYear, currentMonth, i);

          if (date <= today) {
            arr.push(i);
          }
        }
      }
      setSelectedDates(arr);
    }
  }

  return (
    <section
      className={`Calendar ${props.calendarIsOpen && "Calendar_opened"}`}
    >
      <div className="Calendar__header">
        <button
          className="Calendar__header-button"
          onClick={() => {
            checkGlobalDate("down");
          }}
        >
          <Sprite
            src={arrow}
            style={{ transform: "rotate(270deg)" }}
            width="12"
            height="8"
            title="следующий месяц"
            id="arrow"
          />
        </button>
        <p>{`${MONTHS[currentMonth]}, ${currentYear}`}</p>
        <button
          className="Calendar__header-button"
          onClick={() => {
            checkGlobalDate("up");
          }}
        >
          <Sprite
            src={arrow}
            style={{ transform: "rotate(90deg)" }}
            width="12"
            height="8"
            title="следующий месяц"
            id="arrow"
          />
        </button>
      </div>
      <table>
        <tbody>
          <tr className="Calendar__week">
            {WEEK_DAYS.map((i, index) => (
              <td className="Calendar__day" key={`${i}-${index}`}>
                {i}
              </td>
            ))}
          </tr>
          {matrix.map((week, index) => (
            <tr className="Calendar__week" key={`${week}-${index}`}>
              {week.map((day, index) => (
                <td
                  className={`Calendar__day ${
                    selectedDates.includes(day) && "Calendar__day_selected"
                  }`}
                  style={
                    disableWrongDays(day)
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                  key={`${day}-${index}`}
                  onClick={() => {
                    return day !== 0 ? setCurrentDate(day) : null;
                  }}
                  onMouseOver={() => {
                    return day !== 0 ? checkSelection(day) : null;
                  }}
                >
                  {day !== 0 ? day : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Calendar;
