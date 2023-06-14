import React from "react";
import "./List.css";

function List(props) {
  function resetFilter(keys) {
    const arr = props.filters.filter((obj) => {
      if (!keys.includes(obj.key)) {
        return obj;
      } else {
        return null;
      }
    });
    console.log(arr);
    //props.setFilters(arr)
  }

  function setFilter(key, value) {
    const arr = props.filters.slice(0)
    arr.push({key: key, value: value})
    console.log(arr);
    //props.setFilters(arr)
  }

  return (
    <section className="List">
      {props.data.map((item, index) => (
        <div key={index}
          className="List-item"
          onClick={
            item.active === "reset"
              ? () => {
                  resetFilter(item.keys);
                }
              : item.active === "post"
              ? () => {
                  setFilter(item.key, item.value);
                }
              : ""
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
          {item.text ? <p className="List-item_text">{item.text}</p> : ""}
        </div>
      ))}
    </section>
  );
}

export default List;
