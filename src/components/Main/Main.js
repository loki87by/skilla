import React, { useState, useEffect } from "react";
import { debounce } from "../../utils/helpers";
import Info from "./childComponents/Info/Info";
import Search from "../Search/Search.js";
import Filters from "./childComponents/Filters/Filters";
import Rates from "./childComponents/Rates/Rates.js";
import Calls from "./childComponents/Calls/Calls.js";
import "./Main.css";

function Main(props) {
  const [isRatesOpened, setRatesOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("+7");
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
    <section className="Main">
      <Info
        startDate={props.startDate}
        endDate={props.endDate}
        setEndDate={props.setEndDate}
        setStartDate={props.setStartDate}
      />
      <article className="Main__filters">
        <Search
          searchValue={searchValue}
          checkSearchValue={checkSearchValue}
          getSearchValue={getSearchValue}
          children={<p className="Search__text">Поиск по звонкам</p>}
        />
        <div className="Main__filters-params">
          <Filters
            filters={props.filters}
            rates={props.rates.length}
            persons={props.persons}
            apiData={props.apiData}
            setFilters={props.setFilters}
            setInnerFilters={props.setInnerFilters}
            setOuterFilters={props.setOuterFilters}
          />
        </div>
      </article>
      {isRatesOpened ? (
        <Rates
          data={props.apiData}
          rates={props.rates}
          changedIds={changedIds}
          array={ratesData}
          recognizedData={recognizedData}
          setRecognizedData={setRecognizedData}
          setChangedIds={setChangedIds}
          setRatesOpened={setRatesOpened}
          setRates={props.setRates}
        />
      ) : (
        ""
      )}
      <Calls
        withAudioArray={withAudioArray}
        rates={props.rates}
        apiData={props.apiData}
        setRatesOpened={setRatesOpened}
        setRatesData={setRatesData}
      />
    </section>
  );
}

export default Main;
