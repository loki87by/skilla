import React, { useState } from "react";
import { HEADER_CELLS, getRate, getRateColor } from "../../utils/consts";
import Sprite from "../Sprite/Sprite";
import triangle_down from "../../assets/triangle_down.svg";
import "./RateItem.css";

function RateItem(props) {
  const [focus, setFocus] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortDirection, setSortDirection] = useState(true);

  function setCurrentRate(e, id, index) {
    e.preventDefault();
    props.setCurretntId(`${id}_rate-${index}`);
    props.setContextMenuOpened(true);
  }

  function sorted(value) {
    const key = sortKey;
    const dir = sortDirection;
    if (key === value) {
      setSortDirection(!dir);
    }
    setSortKey(value);
    props.setSorted({ key: value, dir: sortDirection });
    props.setRatesUpdated(true);
  }

  return (
    <div className="RateItem">
      {props.isHeader || props.isTotal ? (
        <p
          className={`RateItem_text RateItem_text_manager ${
            props.isTotal && "RateItem_text_total"
          }`}
        >
          {props.isHeader ? "Менеджер" : "Все"}
        </p>
      ) : (
        <div className="RateItem_text RateItem_text_manager">
          <img
            className="RateItem_avatar"
            alt="аватар"
            src={props.data.person_avatar}
          />
          <div className="RateItem_text RateItem_text_manager-data">
            <p className="RateItem_text">{`${props.data.person_name} ${props.data.person_surname}`}</p>
            <p className="RateItem_text">нет данных</p>
          </div>
        </div>
      )}
      {props.isHeader ? (
        <div className="RateItem_text RateItem_text_calls">
          <p className="RateItem_text_call">
            Разговоров
            <span className="RateItem_text RateItem_text_clarification">
              шт
            </span>
          </p>
          <p className="RateItem_text_call">
            Распознано / По скрипту
            <span className="RateItem_text RateItem_text_clarification">%</span>
          </p>
        </div>
      ) : (
        <div
          style={{
            padding: "11px, 0px",
            boxSizing: "border-box",
            flexWrap: "nowrap",
          }}
          className="RateItem_text RateItem_text_calls"
        >
          <div className="RateItem_text RateItem_text_calls RateItem_text_statistic">
            <p className="RateItem_text_call RateItem_text_statistic">
              {props.data.calls}
            </p>
            <p className="RateItem_text_call RateItem_text_statistic">
              {`${props.data.recognized} / `}
              <span
                className={`RateItem_text ${
                  props.data.script < 0
                    ? "RateItem_text_red"
                    : "RateItem_text_green"
                }`}
              >
                {props.data.script > 0 ? props.data.script : 0}
              </span>
            </p>
          </div>
          <div className="RateItem_text RateItem_text_calls RateItem_text_lines">
            <div className="RateItem_text_call RateItem_text_lines"></div>
            <div
              className="RateItem_text_call RateItem_text_lines RateItem_text_line"
              style={{
                background: `linear-gradient(
                to right,
                ${
                  props.data.script - props.data.recognized < 0
                    ? "#ea1a4f"
                    : "#00a775"
                } 0%,
                ${
                  props.data.script - props.data.recognized < 0
                    ? "#ea1a4f"
                    : "#00a775"
                } ${Math.round(
                  (100 / props.data.calls) * props.data.recognized
                )}%,
                #d8e4fb ${Math.round(
                  (100 / props.data.calls) * props.data.recognized
                )}%,
                #d8e4fb 100%
              )`,
              }}
            ></div>
          </div>
        </div>
      )}
      <p
        style={
          !props.isHeader
            ? {
                color:
                  Math.round(Math.sqrt(Math.pow(props.data.converse, 2))) > 75
                    ? "#00a775"
                    : Math.round(Math.sqrt(Math.pow(props.data.converse, 2))) <
                      40
                    ? "#ea1a4f"
                    : "#122945",
              }
            : {}
        }
        className="RateItem_text RateItem_text_converse"
      >
        {props.isHeader
          ? "Конверсия"
          : `${Math.round(Math.sqrt(Math.pow(props.data.converse, 2)))}%`}
      </p>
      {props.isHeader
        ? HEADER_CELLS.map((i, ind) => (
            <div key={ind} className="RateItem_text RateItem_text_cell">
              <p
                id={`RateItem_cell-${ind}`}
                onMouseOut={() => {
                  setFocus("");
                }}
                onMouseOver={(e) => {
                  setFocus(e.target.id);
                }}
                onClick={() => {
                  sorted(i.key);
                }}
                className="RateItem_text_header"
              >
                {i.text}
                <span>
                  <Sprite
                    class={focus !== `RateItem_cell-${ind}` && "hidden"}
                    src={triangle_down}
                    style={
                      sortKey === i.key && !sortDirection
                        ? {}
                        : { transform: "rotate(180deg)" }
                    }
                    width="10"
                    height="5"
                    title="упорядочить"
                    id="triangle_down"
                  />
                </span>
              </p>
            </div>
          ))
        : props.data.rates.map((item, index) => (
            <div
              key={`rate-${item}-${index}`}
              className="RateItem_text RateItem_text_cell"
            >
              {props.isTotal ? (
                <div
                  className="RateItem_text RateItem_rate"
                  style={{
                    background: getRateColor(props.data.rates[index]),
                  }}
                ></div>
              ) : (
                <div
                  id={`${props.data.id}_rate-${index}`}
                  onContextMenu={(e) => {
                    setCurrentRate(e, props.data.id, index);
                  }}
                  className="RateItem_text RateItem_rate"
                  style={{
                    background: getRateColor(props.data.rates[index]),
                  }}
                >
                  {props.curretntId === `${props.data.id}_rate-${index}` &&
                  props.isContextMenuOpened ? (
                    <div className="RateItem_contextMenu">
                      <div
                        onClick={() => {
                          props.setRate(props.data.id, index, "bad");
                        }}
                      >
                        <div
                          className="RateItem_text RateItem_rate"
                          style={{
                            background: "#ea1a4f",
                          }}
                          title="Плохо"
                        ></div>
                        <p>Плохо</p>
                      </div>
                      <div
                        onClick={() => {
                          props.setRate(props.data.id, index, "good");
                        }}
                      >
                        <div
                          className="RateItem_text RateItem_rate"
                          style={{
                            background: "#d8e4fb",
                          }}
                          title="Хорошо"
                        ></div>
                        <p>Хорошо</p>
                      </div>
                      <div
                        onClick={() => {
                          props.setRate(props.data.id, index, "awesome");
                        }}
                      >
                        <div
                          className="RateItem_text RateItem_rate"
                          style={{
                            background: "#28a879",
                          }}
                          title="Отлично"
                        ></div>
                        <p>Отлично</p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          ))}
      <p
        style={
          props.isTotal && props.averageRate !== 0
            ? {
                color: getRateColor(props.averageRate),
                marginLeft: "-20px",
              }
            : !props.isTotal &&
              !props.isHeader &&
              props.getAverage(props.data.rates) !== 0
            ? {
                color: getRateColor(props.getAverage(props.data.rates)),
                marginLeft: "-20px",
              }
            : { marginLeft: "-20px" }
        }
        className="RateItem_text RateItem_text_cell"
      >
        {props.isHeader
          ? "Оценка"
          : props.isTotal
          ? getRate(props.averageRate)
          : getRate(props.getAverage(props.data.rates))}
      </p>
    </div>
  );
}

export default RateItem;
