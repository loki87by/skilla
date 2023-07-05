import React, { useEffect, useState } from "react";
import { HEADER_DATE_OPTIONS, WORKERS } from "../../utils/consts";
import Sprite from "../Sprite/Sprite";
import Search from "../Search/Search";
import arrow from "../../assets/arrow.svg";
import exit from "../../assets/exit.svg";
import exit2 from "../../assets/exit2.svg";
import phone from "../../assets/phone.svg";
import mail from "../../assets/messages.svg";
import avatar from "../../assets/avatar.png";
import "./Header.css";

function Header(props) {
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [persons, setPersons] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [isShowPerson, setShowPerson] = useState(false);
  const [isShowMenu, setShowMenu] = useState(false);
  const [focus, setFocus] = useState("");

  useEffect(() => {
    console.log(props.persons);
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
      console.log(data);
      setPersons(data);
    } else {
      setPersons(props.persons);
    }
  }, [props.persons]);

  const apiError = "API не предоставил данных";
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
      res = [apiError];
    }
    setSearchResult(res);
  }

  function checkResult() {
    if (searchResult !== apiError) {
      setSelectedPerson(searchResult[0]);
    } else {
      return;
    }
  }

  function showPersonsToggle() {
    setShowPerson(!isShowPerson);
  }

  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }

  function checkFocus(e) {
    if (
      e.target.classList[0] &&
      !e.target.classList[0].includes("Header-block-user_menu-list_item")
    ) {
      setFocus("");
    }
  }

  return (
    <header className="Header">
      <div className="Header-block">
        <time>{stringToday.split(".")[0]}</time>
        {analitics.map((item, index) => (
          <div key={index} className="Header-analitics">
            <div className="Header-analitics_text">
              <p>{item.title}</p>
              <p style={{ color: item.color }}>{item.content}</p>
            </div>
            <div className="Header-analitics_progress">
              <div
                style={{ width: item.content, backgroundColor: item.color }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      <div className="Header-block">
        <Search
          class="Header-block-search"
          searchValue={searchValue}
          label={searchResult[0]}
          iconClass="Header-block_search-icon"
          inputClass="Header-block_search-input"
          labelFunc={checkResult}
          checkSearchValue={() => {
            return;
          }}
          getSearchValue={getSearchValue}
          children={
            <>
              <div className="Header-block-user">
                <p className="Header-block-user_name">
                  {selectedPerson
                    ? selectedPerson
                    : "ИП Сидорова Александра Михайловна"}
                </p>
                <Sprite
                  src={arrow}
                  click={showPersonsToggle}
                  class="Header-block-arrow"
                  width="12"
                  height="8"
                  title="выбрать"
                  id="arrow"
                  style={!isShowPerson ? { transform: "rotate(180deg)" } : {}}
                />
                {isShowPerson ? (
                  <div className="Header-block-persons-list">
                    {!props.persons ? <p>{apiError}</p> : ""}
                    {persons.map((i, index) => (
                      <p
                        key={
                          props.persons ? `person-${i.id}` : `person-${index}`
                        }
                      >{`${i.name} ${i.surname}`}</p>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <img
                src={avatar}
                alt="аватар"
                className="Header-block-user_avatar"
              />
              <Sprite
                src={arrow}
                click={toggleMenu}
                class="Header-block-arrow"
                width="12"
                height="8"
                title="выбрать"
                id="arrow"
                style={!isShowMenu ? { transform: "rotate(180deg)" } : {}}
              />
              {isShowMenu ? (
                <div className="Header-block-user_menu">
                  <div className="Header-block-user_menu-header">
                    <div className="Header-block-user_menu-header_title">
                      <p className="Header-block-user_menu-header_title_name">
                        Упоров Кирилл
                      </p>
                      <Sprite
                        src={exit}
                        click={toggleMenu}
                        width="24"
                        height="24"
                        title="выйти"
                        id="exit"
                      />
                    </div>
                    <div className="Header-block-user_menu-header_data">
                      <p>Директор</p>
                      <div className="Header-block-user_menu-header_data-point"></div>
                      <p>Санкт-Петербург</p>
                    </div>
                    <div className="Header-block-user_menu-header_contact">
                      <img
                        className="Header-block-user_menu-header_contact-img"
                        alt="phone"
                        src={phone}
                      />
                      <p>8 (800) 333-17-21</p>
                    </div>
                    <div className="Header-block-user_menu-header_contact">
                      <img
                        className="Header-block-user_menu-header_contact-img"
                        alt="mail"
                        src={mail}
                      />
                      <p>hi@skilla.ru</p>
                    </div>
                  </div>
                  <div className="Header-block-user_menu-list">
                    <ul
                      aria-label="Операторы"
                      className="Header-block-user_menu-list_tittle"
                    >
                      {persons
                        .filter((i) => i.position === "operator")
                        .slice(0, 3)
                        .map((item, index) => (
                          <li
                            onMouseOut={(e) => {
                              checkFocus(e);
                            }}
                            onMouseOver={() => {
                              setFocus(`operator-${index}`);
                            }}
                            className="Header-block-user_menu-list_item"
                            key={
                              props.persons
                                ? `operator-${item.id}`
                                : `operator-${index}`
                            }
                            id={`operator-${index}`}
                          >
                            <div className="Header-block-user_menu-list_item-container">
                              <img
                                src={item.avatar}
                                alt="avatar"
                                className="Header-block-user_menu-list_item-img"
                              />
                              <p className="Header-block-user_menu-list_item-text">{`${item.name} ${item.surname}`}</p>
                              {focus === `operator-${index}` ? (
                                <Sprite
                                  src={exit2}
                                  click={toggleMenu}
                                  class="Header-block-user_menu-list_item-btn"
                                  width="24"
                                  height="24"
                                  title="выйти"
                                  id="exit2"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                    <ul
                      aria-label="Логисты"
                      className="Header-block-user_menu-list_tittle"
                    >
                      {persons
                        .filter((i) => i.position === "frmanager")
                        .slice(0, 3)
                        .map((item, index) => (
                          <li
                            onMouseOut={(e) => {
                              checkFocus(e);
                            }}
                            onMouseOver={() => {
                              setFocus(`frmanager-${index}`);
                            }}
                            className="Header-block-user_menu-list_item"
                            key={
                              props.persons
                                ? `frmanager-${item.id}`
                                : `frmanager-${index}`
                            }
                            id={`frmanager-${index}`}
                          >
                            <div className="Header-block-user_menu-list_item-container">
                              <img
                                src={item.avatar}
                                alt="avatar"
                                className="Header-block-user_menu-list_item-img"
                              />
                              <p className="Header-block-user_menu-list_item-text">{`${item.name} ${item.surname}`}</p>{" "}
                              {focus === `frmanager-${index}` ? (                                <Sprite
                                  src={exit2}
                                  click={toggleMenu}
                                  class="Header-block-user_menu-list_item-btn"
                                  width="24"
                                  height="24"
                                  title="выйти"
                                  id="exit2"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                    <ul
                      aria-label="Бухгалтеры"
                      className="Header-block-user_menu-list_tittle"
                    >
                      {persons
                        .filter((i) => i.position === "accountant")
                        .slice(0, 3)
                        .map((item, index) => (
                          <li
                            onMouseOut={(e) => {
                              checkFocus(e);
                            }}
                            onMouseOver={() => {
                              setFocus(`accountant-${index}`);
                            }}
                            className="Header-block-user_menu-list_item"
                            key={
                              props.persons
                                ? `accountant-${item.id}`
                                : `accountant-${index}`
                            }
                            id={`accountant-${index}`}
                          >
                            <div className="Header-block-user_menu-list_item-container">
                              <img
                                src={item.avatar}
                                alt="avatar"
                                className="Header-block-user_menu-list_item-img"
                              />
                              <p className="Header-block-user_menu-list_item-text">{`${item.name} ${item.surname}`}</p>
                              {focus === `accountant-${index}` ? (
                                <Sprite
                                  src={exit2}
                                  click={toggleMenu}
                                  class="Header-block-user_menu-list_item-btn"
                                  width="24"
                                  height="24"
                                  title="выйти"
                                  id="exit2"
                                />
                              ) : (
                                ""
                              )}
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          }
        />
      </div>
    </header>
  );
}

export default Header;
