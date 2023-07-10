import React, { useState } from "react";
import Call from "../Call/Call";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false);
  const [checkedSounds, setCheckedSounds] = useState([]);

  return (
    <ul className="Calls">
      <li>
        <div className="Calls__item">
          <div className="Calls__item_check">
            {clicked ? <input type="checkbox" disabled={true} /> : <p></p>}
          </div>
          <p className="Calls__item_type">Тип</p>
          <p className="Calls__item_time">Время</p>
          <p className="Calls__item_worker">Сотрудник</p>
          <p className="Calls__item_call">Звонок</p>
          <p className="Calls__item_src">Источник</p>
          <p className="Calls__item_rating">Оценка</p>
          <p className="Calls__item_record">Длительность</p>
        </div>
      </li>
      {props.apiData !== null
        ? props.apiData.map((i) => (
            <Call
              key={i.id}
              data={i}
              checkedSounds={checkedSounds}
              rates={props.rates}
              withAudioArray={props.withAudioArray}
              setCheckedSounds={setCheckedSounds}
              setClicked={setClicked}
              setRatesOpened={props.setRatesOpened}
              setRatesData={props.setRatesData}
            />
          ))
        : ""}
    </ul>
  );
}

export default Calls;
