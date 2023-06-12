import React, { useState, useEffect, useCallback } from "react";
import { WEEK_DAYS } from "../../utils/consts";
import "./Calendar.css";

function Calendar(props) {
  const [rows, setRows] = useState(0);
  const [currentYear, setCurrentYear] = useState(2023);
  const [currentMonth, setCurrentMonth] = useState(5);
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
      if (date >= startDate) {
        props.setEndDate(date);
      } else {
        props.setStartDate(date);
        props.setEndDate(props.startDate);
      }
      const sorted = [date, startDate].sort();
      const period = Math.floor((sorted[1] - sorted[0]) / 3600 / 24000 + 1);
      props.setPeriod(period);
      setStartDate(null);
      props.setCalendarOpen(false);
      props.setSelectedItem("Даты")
      setSelectedDates([]);
    }
  }

  function checkGlobalDate(arg) {
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

  function checkSelection(day) {
    if (!startDate) {
      return;
    } else {
      setSelectedDates([startDate.getDate()]);
      const sorted = [startDate.getDate(), day].sort((a, b) => {
        return a - b;
      });
      const arr = [startDate.getDate()];
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
      <div className="Calendar-header">
        <button
          className="Calendar-header-prevMonth"
          onClick={() => {
            checkGlobalDate("down");
          }}
        >
          назад
        </button>
        <p>{`${currentMonth + 1}, ${currentYear}`}</p>
        <button
          className="Calendar-header-nextMonth"
          onClick={() => {
            checkGlobalDate("up");
          }}
        >
          вперед
        </button>
      </div>
      <table>
        <tbody>
          <tr className="Calendar-week">
            {WEEK_DAYS.map((i, index) => (
              <td className="Calendar-day" key={`${i}-${index}`}>
                {i}
              </td>
            ))}
          </tr>
          {matrix.map((week, index) => (
            <tr className="Calendar-week" key={`${week}-${index}`}>
              {week.map((day, index) => (
                <td
                  className={`Calendar-day ${
                    selectedDates.includes(day) && "Calendar-day_selected"
                  }`}
                  style={
                    disableWrongDays(day)
                      ? { cursor: "pointer" }
                      : { cursor: "default" }
                  }
                  key={`${day}-${index}`}
                  onClick={() => {
                    // eslint-disable-next-line no-unused-expressions
                    day !== 0 ? setCurrentDate(day) : "";
                  }}
                  onMouseOver={() => {
                    // eslint-disable-next-line no-unused-expressions
                    day !== 0 ? checkSelection(day) : "";
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
