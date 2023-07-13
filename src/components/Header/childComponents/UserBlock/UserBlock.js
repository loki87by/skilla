import React, { useState } from "react";
import { API_ERROR } from "../../../../utils/db";
import Sprite from "../../../Sprite/Sprite";
import UserList from "../UserList/UserList";
import avatar from "../../../../assets/avatar.png";
import arrow from "../../../../assets/arrow.svg";
import exit from "../../../../assets/exit.svg";
import phone from "../../../../assets/phone.svg";
import mail from "../../../../assets/messages.svg";
import "./UserBlock.css";

function UserBlock(props) {
  const [isShowPerson, setShowPerson] = useState(false);
  const [isShowMenu, setShowMenu] = useState(false);
  const [focus, setFocus] = useState("");

  function showPersonsToggle() {
    setShowPerson(!isShowPerson);
  }

  function toggleMenu() {
    setShowMenu(!isShowMenu);
  }

  function checkFocus(e) {
    if (
      e.target.classList[0] &&
      !e.target.classList[0].includes("UserList__item")
    ) {
      setFocus("");
    }
  }

  return (
    <>
      <div className="UserBlock">
        <p className="UserBlock__name">
          {props.selectedPerson
            ? props.selectedPerson
            : "ИП Сидорова Александра Михайловна"}
        </p>
        <Sprite
          src={arrow}
          click={showPersonsToggle}
          class="UserBlock__arrow"
          width="12"
          height="8"
          title="выбрать"
          id="arrow"
          style={!isShowPerson ? { transform: "rotate(180deg)" } : {}}
        />
        {isShowPerson ? (
          <div className="UserBlock__persons-list">
            {!props.propsPersons ? (
              <p>{`${API_ERROR}, дальнейшие строки представлены лишь для ознакомления`}</p>
            ) : (
              ""
            )}
            {props.persons.map((i, index) => (
              <p className="UserBlock__name"
                key={props.propsPersons ? `person-${i.id}` : `person-${index}`}
              >{`${i.name} ${i.surname}`}</p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <img src={avatar} alt="аватар" className="UserBlock__avatar" />
      <Sprite
        src={arrow}
        click={toggleMenu}
        class="UserBlock__arrow"
        width="12"
        height="8"
        title="выбрать"
        id="arrow"
        style={!isShowMenu ? { transform: "rotate(180deg)" } : {}}
      />
      {isShowMenu ? (
        <div className="UserBlock__menu">
          <div className="UserBlock__header">
            <div className="UserBlock__header-title">
              <p className="UserBlock__header-title_name">Упоров Кирилл</p>
              <Sprite
                src={exit}
                click={toggleMenu}
                width="24"
                height="24"
                title="выйти"
                id="exit"
                class="UserBlock__header-title_exit"
              />
            </div>
            <div className="UserBlock__header-data">
              <p>Директор</p>
              <div className="UserBlock__header-data_point"></div>
              <p>Санкт-Петербург</p>
            </div>
            <div className="UserBlock__header-contact">
              <img
                className="UserBlock__header-contact_img"
                alt="phone"
                src={phone}
              />
              <p>8 (800) 333-17-21</p>
            </div>
            <div className="UserBlock__header-contact">
              <img
                className="UserBlock__header-contact_img"
                alt="mail"
                src={mail}
              />
              <p>hi@skilla.ru</p>
            </div>
          </div>
          <div className="UserBlock__menu-list">
            <UserList
              label="Операторы"
              position="operator"
              focus={focus}
              propsPersons={props.propsPersons}
              persons={props.persons}
              checkFocus={checkFocus}
              setFocus={setFocus}
              toggleMenu={toggleMenu}
            />
            <UserList
              label="Логисты"
              position="frmanager"
              focus={focus}
              propsPersons={props.propsPersons}
              persons={props.persons}
              checkFocus={checkFocus}
              setFocus={setFocus}
              toggleMenu={toggleMenu}
            />
            <UserList
              label="Бухгалтеры"
              position="accountant"
              focus={focus}
              propsPersons={props.propsPersons}
              persons={props.persons}
              checkFocus={checkFocus}
              setFocus={setFocus}
              toggleMenu={toggleMenu}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default UserBlock;
