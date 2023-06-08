import React, { useState } from "react";
import Player from '../Player/Player.js'
import {getRecord} from "../../utils/Api.js"
import incomming from "../../assets/call_in.svg";
import outer from "../../assets/call_out.svg";
import phone from "../../assets/phone.svg";
import network from "../../assets/network.svg";
import "./Call.css";

function Call(props) {
  const [clicked, setClicked] = useState(false);
  const [focus, setFocus] = useState(false);
  const [record, setRecord] = useState(null)

  function click() {
    setClicked(!clicked);
    props.setClicked(!clicked);
    getRecord(props.data.record).then((res) => {
      console.log(res)
      setRecord(res)
    })
  }

  return (
    <li
      onMouseOut={() => {
        setFocus(true);
      }}
      onMouseOver={() => {
        setFocus(false);
      }}
    >
      <div className="Calls_content-item" onClick={click}>
        <div className="Calls_content-item__check">
          {clicked ? <input type="checkbox" /> : ""}
        </div>
        <img
          src={props.data.in_out === 1 ? incomming : outer}
          alt={props.data.in_out === 1 ? "входящий" : "исходящий"}
          className="Calls_content-item__type"
        />
        <time className="Calls_content-item__time">
          {props.data.date.replace(props.data.date_notime, "").slice(1, 6)}
        </time>
        <img
          className="Calls_content-item__worker Call_content-item__worker"
          src={props.data.person_avatar}
          alt="аватар"
        />
        <div className="Calls_content-item__call">
          {props.data.from_site ? (
            <img
              className="Calls_content-item__call-icon"
              src={network}
              alt="звонок с сайта"
            />
          ) : (
            ""
          )}
          {focus ? (
            <img
              className="Calls_content-item__call-icon Calls_content-item__call-phone"
              src={phone}
              alt="позвонить"
            />
          ) : (
            ""
          )}
          <p>{props.data.partner_data.phone}</p>
        </div>
        <p className="Calls_content-item__src">{props.data.source}</p>
        <p className="Calls_content-item__rating">Оценка</p>
        {focus ? <Player sound={record} /> :
        <p className="Calls_content-item__record">{props.data.time}</p>}
      </div>
    </li>
  );
}

export default Call;
