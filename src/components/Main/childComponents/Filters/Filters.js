import React, { useEffect, useState } from "react";
import {
  BASIC_FILTERS_TEXT,
  TYPES,
  CALLS,
  MANAGERS,
  SOURCES,
  RATES,
  ERRORS,
} from "../../../../utils/consts";
import List from "../List/List";
import Sprite from "../../../Sprite/Sprite";
import cross from "../../../../assets/cross.svg";
import arrow from "../../../../assets/arrow.svg";
import "./Filters.css";

function Filters(props) {
  const [openedList, setOpenedList] = useState(NaN);
  const [isListOpen, setListOpen] = useState(false);
  const [isFiltersSetted, setFiltersSetted] = useState(false);
  const [isFiltersChanged, setFiltersChanged] = useState(false);
  const [listData, setListData] = useState(null);
  const [filtersCurrent, setFiltersCurrent] = useState(BASIC_FILTERS_TEXT);
  const [workers, setWorkers] = useState(null);

  useEffect(() => {
    if (props.persons && props.persons.length > 0) {
      setWorkers(props.persons);
    } else {
      setWorkers(MANAGERS);
    }
  }, [props.persons]);

  const filters = [TYPES, CALLS, workers, SOURCES, RATES, ERRORS];

  function resetFilters() {
    props.setInnerFilters([]);
    props.setOuterFilters([]);
    setFiltersChanged(true);
    setFiltersSetted(false);
  }

  useEffect(() => {
    if (isFiltersChanged) {
      setOpenedList(NaN);
      setListData(null);
      setFiltersChanged(false);
    }
  }, [isFiltersChanged]);

  function showList(index, list) {
    setOpenedList(index);
    setListData(list);
    setListOpen(true);
  }

  function hideList() {
    setListOpen(false);
  }

  return (
    <section className="Filters">
      {isFiltersSetted ? (
        <div className="Filters__button" onClick={resetFilters}>
          <p className="Filters__button-text">Сбросить фильтры</p>
          <Sprite
            src={cross}
            width="14"
            style={{ transform: "scale(0.65)" }}
            height="14"
            title="закрыть"
            id="cross"
          />
        </div>
      ) : (
        ""
      )}
      {filters.map((fil, ind) => (
        <div
          key={ind}
          className="Filters__button"
          onClick={() => {
            isListOpen && openedList === ind ? hideList() : showList(ind, fil);
          }}
        >
          <p
            className={`Filters__button-text ${
              filtersCurrent[ind] !== BASIC_FILTERS_TEXT[ind] &&
              "Filters__button-text_selected"
            }`}
          >
            {filtersCurrent[ind]}
          </p>
          <Sprite
            src={arrow}
            style={!isListOpen ? { transform: "rotate(180deg)" } : {}}
            width="10"
            height="6"
            title="выбрать"
            id="arrow"
          />
          {isListOpen && openedList === ind ? (
            <List
              data={listData}
              filtersCurrent={filtersCurrent}
              index={ind}
              rates={props.rates}
              filters={props.filters}
              setFilters={props.setFilters}
              setInnerFilters={props.setInnerFilters}
              setOuterFilters={props.setOuterFilters}
              setFiltersSetted={setFiltersSetted}
              setFiltersCurrent={setFiltersCurrent}
              setFiltersChanged={setFiltersChanged}
              setListOpen={setListOpen}
            />
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
}

export default Filters;
