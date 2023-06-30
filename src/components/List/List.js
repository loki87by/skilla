import React from "react";
import { BASIC_FILTERS_TEXT } from "../../utils/consts";
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
    const base = BASIC_FILTERS_TEXT.slice();
    base[props.index] = text;
    props.setFiltersCurrent(base);
    const arr = props.filters.slice(0);
    arr.push({ key: key, value: value });
    props.setFilters(arr);
    props.setFiltersChanged(true);
  }

  function filterDB(key, values, text, outer, inner) {
    if (key === "is") {
      resetFilter(values.slice());
      props.setOuterFilters(outer);
      props.setInnerFilters(inner);
      props.setFiltersChanged(true);
      const base = BASIC_FILTERS_TEXT.slice();
      base[props.index] = text;
      props.setFiltersCurrent(base);
    }
    /*    if (key === 'not') {
  const arr = apiData.filter((item) => {
    if (!values.includes(obj.key)) {
      return obj;
    } else {
      return null;
    }
  });
  console.log(arr);
} */
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
          className="List-item"
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
                    item.inner
                  );
                }
              : () => {
                  return;
                }
          }
        >
          {item.image ? (
            <img
              className="List-item_image"
              src={item.image.src}
              alt={item.image.alt}
            />
          ) : (
            ""
          )}
          {item.text ? (
            <p
              className={`List-item_text ${
                item.decorate === "pinkStyle" && "List-item_text_pink"
              } ${item.decorate === "greyStyle" && "List-item_text_grey"}  ${
                item.decorate === "greenStyle" && "List-item_text_green"
              }`}
            >
              {item.text}
            </p>
          ) : (
            ""
          )}
          {item.decorate === "yellowCircle" ? (
            <div className="List-item_icon"></div>
          ) : (
            ""
          )}
          {item.decorate === "redCircle" ? (
            <div className="List-item_icon List-item_icon_magenta"></div>
          ) : (
            ""
          )}
          {item.decorate === "greyCircles" ? (
            <>
              <div className="List-item_icon List-item_icon_grey"></div>
              <div className="List-item_icon List-item_icon_grey"></div>
            </>
          ) : (
            ""
          )}
          {item.decorate === "greenCircles" ? (
            <>
              <div className="List-item_icon List-item_icon_green"></div>
              <div className="List-item_icon List-item_icon_green"></div>
              <div className="List-item_icon List-item_icon_green"></div>
            </>
          ) : (
            ""
          )}
        </div>
      ))}
    </section>
  );
}

export default List;
