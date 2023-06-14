import React, { useState } from "react";
import { TYPES } from "../../utils/consts";
import List from "../List/List";
import Sprite from '../Sprite/Sprite'
import cross from "../../assets/cross.svg";
import arrow from "../../assets/arrow.svg";
import "./Filters.css";

function Filters(props) {
  const [openedList, setOpenedList] = useState(NaN);
  const [isFiltersSetted, setFiltersSetted] = useState(false);
  const [listData, setListData] = useState(null);

  function resetFilters() {
    setFiltersSetted(false);
    setOpenedList(NaN);
    setListData(null);
  }

  function showList(index, list) {
    setOpenedList(index);
    setListData(list);
  }

  return (
    <section className="Filters">
      {isFiltersSetted ? (
        <div className="Filters_button" onClick={resetFilters}>
          <p className="Filters_button-text">Сбросить фильтры</p>
          <Sprite src={cross} width="9" height="9" title="закрыть" id="cross"/>
          </div>
      ) : (
        ""
      )}
      <div
        className="Filters_button"
        onClick={() => {
          showList(0, TYPES);
        }}
      >
        <p className="Filters_button-text">Все типы</p>
        <Sprite src={arrow} class={`${openedList !== 0 && "Filters_button-icon"}`} width="10" height="6" title="выбрать тип" id="arrow"/>
        {openedList === 0 ? (
          <List
            data={listData}
            filters={props.filters}
            setFilters={props.setFilters}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}

export default Filters;
