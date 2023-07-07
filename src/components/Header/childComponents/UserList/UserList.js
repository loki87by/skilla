import React from "react";
import Sprite from "../../../Sprite/Sprite";
import exit2 from "../../../../assets/exit2.svg";
import "./UserList.css";

function UserList(props) {
  return (
    <ul aria-label={props.label} className="UserList__title">
      {props.persons
        .filter((i) => i.position === props.position)
        .slice(0, 3)
        .map((item, index) => (
          <li
            onMouseOut={(e) => {
              props.checkFocus(e);
            }}
            onMouseOver={() => {
              props.setFocus(`${props.position}-${index}`);
            }}
            className="UserList__item"
            key={
              props.propsPersons
                ? `${props.position}-${item.id}`
                : `${props.position}-${index}`
            }
            id={`${props.position}-${index}`}
          >
            <div className="UserList__item_container">
              <img
                src={item.avatar}
                alt="avatar"
                className="UserList__item_img"
              />
              <p className="UserList__item_text">{`${item.name} ${item.surname}`}</p>
              {props.focus === `${props.position}-${index}` ? (
                <Sprite
                  src={exit2}
                  click={props.toggleMenu}
                  class="UserList__item_btn"
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
  );
}

export default UserList;
