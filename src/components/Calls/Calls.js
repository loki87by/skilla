import React, { useState, useEffect, useRef } from "react";
import { debounce } from "../../utils/consts";
import Info from "../Info/Info";
import Call from "../Call/Call";
import Filters from "../Filters/Filters";
import Rate from "../Rate/Rate.js";
import Sprite from "../Sprite/Sprite";
import cross from "../../assets/cross.svg";
import search from "../../assets/search.svg";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [searchIsOpen, setSearchOpen] = useState(false);
  const [isRatesOpened, setRatesOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("+7");
  const [checkedSounds, setCheckedSounds] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [changedIds, setChangedIds] = useState([]);
  const [recognizedData, setRecognizedData] = useState([]);

  const [withAudioArray, setWithAudioArray] = useState([]);

  const searchRef = useRef(null);

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
    setSearchOpen(true);
  }

  function closeSearch() {
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

  useEffect(() => {
    if (props.apiData) {
      const arr = props.apiData.filter((i) => {
        if (i.record !== "" && i.partnership_id !== "") {
          return i;
        } else {
          return null;
        }
      });
      setWithAudioArray(arr);
    }
  }, [props.apiData]);

  /*   function recognize(data) {
    setRatesData([data])
    setRatesOpened(true)
  } */

  return (
    <section className="Calls">
      <Info
        startDate={props.startDate}
        period={props.period}
        endDate={props.endDate}
        setEndDate={props.setEndDate}
        setPeriod={props.setPeriod}
        setStartDate={props.setStartDate}
      />
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
          <Filters
            filters={props.filters}
            apiData={props.apiData}
            setFilters={props.setFilters}
            setInnerFilters={props.setInnerFilters}
            setOuterFilters={props.setOuterFilters}
          />
        </div>
      </article>
      {isRatesOpened ? (
        <Rate
          data={props.apiData}
          changedIds={changedIds}
          array={ratesData}
           recognizedData={recognizedData}
           setRecognizedData={setRecognizedData}
          setChangedIds={setChangedIds}
          setRatesOpened={setRatesOpened}
        />
      ) : (
        ""
      )}
      <ul className="Calls_content">
        <li>
          <div className="Calls_content-item">
            <div className="Calls_content-item__check">
              {clicked ? <input type="checkbox" disabled={true} /> : <p></p>}
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
              <Call
                key={i.id}
                data={i}
                checkedSounds={checkedSounds}
                withAudioArray={withAudioArray}
                setCheckedSounds={setCheckedSounds}
                setClicked={setClicked}
                setRatesOpened={setRatesOpened}
                setRatesData={setRatesData}
              />
            ))
          : ""}
      </ul>
    </section>
  );
}

export default Calls;
