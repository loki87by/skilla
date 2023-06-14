import React, { useState, useEffect, useMemo, useRef } from "react";
import { DATE_OPTIONS, debounce } from "../../utils/consts";
import Call from "../Call/Call";
import Calendar from "../Calendar/Calendar";
import Filters from "../Filters/Filters";
import Sprite from "../Sprite/Sprite";
import calendar from "../../assets/calendar.svg";
import arrow from "../../assets/arrow.svg";
import cross from "../../assets/cross.svg";
import balance from "../../assets/balance.svg";
import search from "../../assets/search.svg";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [dateSelectIsOpen, setDateSelectOpen] = useState(false);
  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const [searchIsOpen, setSearchOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("3 дня");
  const [searchValue, setSearchValue] = useState("+7");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const searchRef = useRef(null);/*
  const filters = [

    {text: 'Все звонки', key: 'from_type[]', values: [
      {ru: 'Клиенты', en: 'clients'},
      {ru: 'Новые клиенты', en: 'new_clients', styles: 'after'},
      {ru: 'Рабочие', en: 'workers'},
      {ru: 'Приложение', en: 'app'},]},
    {text: 'Все источники', key: 'sources[]', values: [
      {ru: 'С сайта', en: 'from_site'},
      {ru: 'Yandex номер', en: 'yandex'},
      {ru: 'Google номер', en: 'google'},
      {ru: 'Без источника', en: 'empty'},]},
    {text: 'Все оценки', key: 'errors[]', values: [
      {ru: 'Без ошибок', en: 'noerrors'},
      {ru: 'Скрипт не использован', en: 'noscript'}]},
    {text: '', key: '', values: []}
  ] */

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

  function resetDates() {
    setStartDate(null);
    setEndDate(null);
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

  function getSearchValue(e) {
    const val = e ? e.replace(/\D/gi, "").slice(1).split("") : "";

    if (val.length === 0) {
      setSearchValue("+7");
    } else if (val.length < 4) {
      setSearchValue(`+7 (${e.replace(/\D/gi, "").slice(1)})`);
    } else if (val.length < 7) {
      setSearchValue(
        `+7 (${e.replace(/\D/gi, "").slice(1, 4)}) ${e
          .replace(/\D/gi, "")
          .slice(4)}`
      );
    } else if (val.length < 9) {
      setSearchValue(
        `+7 (${e.replace(/\D/gi, "").slice(1, 4)}) ${e
          .replace(/\D/gi, "")
          .slice(4, 7)}-${e.replace(/\D/gi, "").slice(7)}`
      );
    } else {
      setSearchValue(
        `+7 (${e.replace(/\D/gi, "").slice(1, 4)}) ${e
          .replace(/\D/gi, "")
          .slice(4, 7)}-${e.replace(/\D/gi, "").slice(7, 9)}-${e
          .replace(/\D/gi, "")
          .slice(9, 11)}`
      );
    }
  }

  function checkSearchValue() {
    if (searchValue.length < 9) {
      const nums = searchValue.replace(/\D/gi, "");
      const cutted = nums.slice(1, nums.length - 1);
      if (nums.length > 2) {
        setSearchValue(`+7 (${cutted})`);
      } else {
        setSearchValue("+7");
      }
    }
  }

  function openSearch() {
    console.log(1);
    setSearchOpen(true);
  }

  function closeSearch() {
    console.log(0);
    setSearchOpen(false);
  }

  useEffect(() => {
    if (searchIsOpen) {
      searchRef.current.focus();
    }
  });

  useEffect(() => {
    if (searchValue.length > 2) {
      debounce(props.setSearch, 500, searchValue.replace(/\D/gi, ""));
    }
  });

  return (
    <section className="Calls">
      <article className="Calls_info">
        <div className="Calls_info-balance">
          <p className="Calls_info-balance-text">
            Баланс: <span>272 ₽</span>
          </p>
          <img
            src={balance}
            alt="пополнить"
            title="пополнить"
            className="Calls_info-balance-button"
          />
        </div>
        <div className="Calls_info-calendar">
              <Sprite
                src={arrow}
                click={showDateSelect}
                class="Calls_info-calendar_arrow-left"
                width="12"
                height="8"
                title="выбрать период"
                id="arrow"
              />
              <Sprite
                src={calendar}
                click={showDateSelect}
                class="Calls_info-calendar_icon"
                width="16"
                height="18"
                title="выбрать период"
                id="calendar"
              />
          <p onClick={showDateSelect} className="Calls_info-calendar_text">
            {selectedItem}
          </p>
              <Sprite
                src={arrow}
                click={showDateSelect}
                class="Calls_info-calendar_arrow-right"
                width="12"
                height="8"
                title="выбрать период"
                id="arrow"
              />
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
                class="Calls_info-calendar_select-item_icon"
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
      <article className="Calls_filters">
        <div className="Calls_filters-search">
              <Sprite
                src={search}
                click={openSearch}
                class={`Calls_filters-search_icon ${
                  searchIsOpen && "Calls_filters-search_icon-opened"
                }`}
                width="16"
                height="16"
                title="искать"
                id="search"
              />
          {searchIsOpen ? (
            <>
              <input
                ref={searchRef}
                className="Calls_filters-search_input"
                type="text"
                value={searchValue}
                onKeyUp={(e) => {
                  if (e.key === "Backspace") {
                    checkSearchValue();
                  }
                }}
                onChange={(e) => {
                  getSearchValue(e.target.value);
                }}
              />
              <Sprite
                src={cross}
                click={closeSearch}
                class="Calls_info-calendar_arrow-right"
                width="4"
                height="14"
                title="закрыть"
                id="cross"
              />
            </>
          ) : (
            <p className="Calls_filters-search_text" onClick={openSearch}>
              Поиск по звонкам
            </p>
          )}
        </div>
        <div className="Calls_filters-params">
<Filters filters={props.filters} setFilters={props.setFilters}/>
        </div>
      </article>
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
