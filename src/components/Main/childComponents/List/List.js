import React from "react";
import { BASIC_FILTERS_TEXT } from "../../../../utils/db";
import RateIcon from "../RateIcon/RateIcon";
import RateText from "../RateText/RateText";
import avatar from "../../../../assets/avatar2.png";
import "./List.css";

function List(props) {
  function resetFilter(keys) {
    props.setFiltersCurrent(BASIC_FILTERS_TEXT);
    const arr = props.filters.filter((obj) => {
      if (!keys.includes(obj.key)) {
        return obj;
      } else {
        return null;
      }
    });
    props.setFilters(arr);
    props.setFiltersChanged(true);
  }

  function setFilter(key, value, text) {
    props.setFiltersSetted(true);
    const base = props.filtersCurrent.slice();
    base[props.index] = text;
    props.setFiltersCurrent(base);
    const arr = props.filters.slice(0);
    arr.push({ key: key, value: value });
    props.setFilters(arr);
    props.setFiltersChanged(true);
  }

  function filterDB(key, values, text, outer, inner, decorate) {
    if (key === "is") {
      resetFilter(values.slice());
      props.setOuterFilters(outer);

      if (
        (!decorate && !inner[0].mistake) ||
        (typeof decorate === "string" && props.rates > 0) ||
        (inner[0].mistake && props.rates > 0)
      ) {
        props.setInnerFilters(inner);
      } else if (
        (typeof decorate === "string" && props.rates === 0) ||
        (inner[0].mistake && props.rates === 0)
      ) {
        alert(
          'API не предоставляет данные об оценках. Для начала выберите "Распознать" чтоб выставить оценки.'
        );
      }
      props.setFiltersChanged(true);
      props.setFiltersSetted(true);
      const base = props.filtersCurrent.slice();
      base[props.index] = text;
      props.setFiltersCurrent(base);
    }
  }

  return (
    <section className="List">
      {props.data.map((item, index) => (
        <div
          key={index}
          title={
            item.active === "none"
              ? "Не кликабельно из-за ошибки в ТЗ или API"
              : ""
          }
          className="List__item"
          onClick={
            item.active === "reset"
              ? () => {
                  resetFilter(item.keys);
                }
              : item.active === "post"
              ? () => {
                  setFilter(item.key, item.value, item.text);
                }
              : item.active === "filter"
              ? () => {
                  filterDB(
                    item.key,
                    item.values,
                    item.text,
                    item.outer,
                    item.inner,
                    item.decorate
                  );
                }
              : () => {
                  return;
                }
          }
        >
          {item.image ? (
            <img className="List__item-image" src={avatar} alt="avatar" />
          ) : (
            ""
          )}
          {item.text ? (
            item.decorate && item.decorate !== "yellowCircle" ? (
              <RateText
                average={
                  item.decorate === "pinkStyle"
                    ? -1
                    : item.decorate === "greenStyle"
                    ? 1
                    : 0
                }
              />
            ) : (
              <p className="List__item-text">{item.text}</p>
            )
          ) : (
            ""
          )}
          {item.decorate === "yellowCircle" ? (
            <div className="List__item-icon"></div>
          ) : (
            ""
          )}
          {item.decorate === "redCircle" ? <RateIcon average={-1} /> : ""}
          {item.decorate === "greyCircles" ? <RateIcon average={0} /> : ""}
          {item.decorate === "greenCircles" ? <RateIcon average={1} /> : ""}
        </div>
      ))}
    </section>
  );
}

export default List;
