import React, {useState} from "react";
import Call from "../Call/Call";
import "./Calls.css";

function Calls(props) {
  const [clicked, setClicked] = useState(false)
  return (
    <section className="Calls">
      <article className="Calls_info"></article>
      <article className="Calls_filters"></article>
      <ul className="Calls_content">
        <li>
          <div className="Calls_content-item">
            <div className="Calls_content-item__check">
              {clicked ?
              <input type="checkbox" disabled={true} /> : ''}
            </div>
            <p className="Calls_content-item__type">Тип</p>
            <p className="Calls_content-item__time">Время</p>
            <p className="Calls_content-item__worker">Сотрудник</p>
            <p className="Calls_content-item__call">Звонок</p>
            <p className="Calls_content-item__src">Источник</p>
            <p className="Calls_content-item__rating">Оценка</p>
            <p className="Calls_content-item__record">Длительность</p>
          </div>
        </li>
          {props.apiData !== null ? props.apiData.map(i => <Call key={i.id} data={i} setClicked={setClicked}/>) : ''}
      </ul>
    </section>
  );
}

export default Calls;
