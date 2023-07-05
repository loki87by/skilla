import React, { useState, useEffect } from "react";
import { debounce } from "../../utils/consts";
import Info from "../Info/Info";
import Search from "../Search/Search.js";
import Call from "../Call/Call";
import Filters from "../Filters/Filters";
import Rate from "../Rate/Rate.js";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [isRatesOpened, setRatesOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("+7");
  const [checkedSounds, setCheckedSounds] = useState([]);
  const [ratesData, setRatesData] = useState([]);
  const [changedIds, setChangedIds] = useState([]);
  const [recognizedData, setRecognizedData] = useState([]);
  const [withAudioArray, setWithAudioArray] = useState([]);

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

  function checkSearchValue(e) {
    if (e.key === "Backspace") {
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
  }

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
        <Search
          searchValue={searchValue}
          checkSearchValue={checkSearchValue}
          getSearchValue={getSearchValue}
          children={<p className="Search__text">Поиск по звонкам</p>
          }
        />
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
