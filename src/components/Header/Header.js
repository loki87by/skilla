import React, { useEffect, useState } from "react";
import { HEADER_DATE_OPTIONS, WORKERS, API_ERROR } from "../../utils/consts";
import Search from "../Search/Search";
import UserBlock from "./childComponents/UserBlock/UserBlock";
import "./Header.css";

function Header(props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    if (!props.persons) {
      const data = [];
      WORKERS.forEach((i) => {
        const objs = i.list.map((it) => {
          const nameData = it.split(" ");
          const name = nameData[0];
          const surname = nameData[1];
          const position = i.title;
          return { name, surname, position };
        });
        data.push(...objs);
      });
      setPersons(data);
    } else {
      setPersons(props.persons);
    }
  }, [props.persons]);

  const today = new Date();
  const stringToday = new Intl.DateTimeFormat(
    "ru-RU",
    HEADER_DATE_OPTIONS
  ).format(today);
  const analitics = [
    { title: "Новые звонки\u00A0", content: "20 из 30 шт", color: "#28a879" },
    { title: "Качество разговоров\u00A0", content: "40%", color: "#ffd500" },
    { title: "Конверсия в заказ\u00A0", content: "67%", color: "#ea1a4f" },
  ];

  function getSearchValue(val) {
    setSearchValue(val);
    let res = [];

    if (props.persons) {
      const values = Object.values(props.persons);
      res = values.filter((i) =>
        i.toString().toLowerCase().includes(val.toString().toLowerCase())
      );
    } else {
      res = [API_ERROR];
    }
    setSearchResult(res);
  }

  function checkResult() {
    if (searchResult !== API_ERROR) {
      setSelectedPerson(searchResult[0]);
    } else {
      return;
    }
  }

  return (
    <header className="Header">
      <div className="Header__block">
        <time>{`${stringToday
          .split(".")[0]
          .charAt(0)
          .toUpperCase()}${stringToday.split(".")[0].slice(1)}`}</time>
        {analitics.map((item, index) => (
          <div key={index} className="Header__analitics">
            <div className="Header__analitics-text">
              <p>{item.title}</p>
              <p style={{ color: item.color }}>{item.content}</p>
            </div>
            <div className="Header__analitics-progress">
              <div
                style={{ width: item.content, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="Header__block">
        <Search
          searchValue={searchValue}
          label={searchResult[0]}
          class="Header__block-search"
          openedClass="Header__block-search_opened"
          /* containerClass="Header__block-search_container" */
          iconClass="Header__block-search_icon"
          inputClass="Header__block-search_input"
          labelFunc={checkResult}
          checkSearchValue={() => {
            return;
          }}
          getSearchValue={getSearchValue}
          children={
            <UserBlock
              persons={persons}
              selectedPerson={selectedPerson}
              propsPersons={props.persons}
            />
          }
        />
      </div>
    </header>
  );
}

export default Header;
