import React, { useCallback, useEffect, useState } from "react";
import { getRate, getRateColor } from "../../utils/consts";
import Sprite from "../Sprite/Sprite";
import arrow from "../../assets/arrow.svg";
import question from "../../assets/question.svg";
import "./Rate.css";

function Rate(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(null);
  const [newData, setNewData] = useState([]);
  const [averageRate, setAverageRate] = useState([]);
  const [curretntId, setCurretntId] = useState("");
  const [isContextMenuOpened, setContextMenuOpened] = useState(false);
  const [isRatesUpdated, setRatesUpdated] = useState(false);

  useEffect(() => {
    if (isRatesUpdated) {
      setData(newData);
      setRatesUpdated(false);
    }
  }, [isRatesUpdated, newData, props]);

  useEffect(() => {
    if (props.array) {
      const changed = [];
      const arr = props.array.map((i) => {
        const oldData = props.changedIds.findIndex((it) => it === i.id);
        if (oldData < 0 || !props.recognizedData[oldData]) {
          const {
            id,
            person_id,
            person_name,
            person_surname,
            person_avatar,
            errors,
          } = i;
          const error = errors.length === 0 ? false : true;
          const rates = [0, 0, 0, 0, 0, 0, 0];
          const managerCalls = props.data.filter(
            (it) => it.person_id === person_id
          );
          const calls = managerCalls.length;
          const recognized = 0;
          const script =
            0 - managerCalls.filter((item) => item.errors.length > 0).length;
          const converse = 0;
          return {
            id,
            calls,
            recognized,
            script,
            converse,
            error,
            person_id,
            person_name,
            person_surname,
            person_avatar,
            rates,
          };
        } else {
          const { person_id, recognized, script, converse } =
            props.recognizedData[oldData];
          changed.push({ person_id, recognized, script, converse });
          return props.recognizedData[oldData];
        }
      });
      setData(arr);
    }
  }, [props.array, props.changedIds, props.data, props.recognizedData]);

  const getSum = useCallback((param) => {
    return param.reduce((p, i) => {
      if (!p) {
        p = 0;
      }
      return p + i;
    }, 0);
  }, []);

  const getAverage = useCallback(
    (param) => {
      const sum = getSum(param);
      const len = data.length;
      return sum > 0 ? Math.ceil(sum / len) : Math.floor(sum / len);
    },
    [data, getSum]
  );

  const findOriginal = useCallback(
    (param, average) => {
      const arr = [];
      let res = 0;
      data.forEach((i) => {
        if (!arr.find((it) => it === i.person_id)) {
          arr.push(i.person_id);
          res += i[param];
        }
      });
      return res;
    },
    [data]
  );

  useEffect(() => {
    if (data.length > 1) {
      let error = 0;
      data.forEach((i) => {
        if (i.error) {
          error += 1;
        }
      });
      const allRates = data.map((i) => i.rates);
      const rates = allRates[0].map((i, ind) => {
        const reduced = allRates.reduce((prev, item) => {
          if (!prev) {
            prev = [];
          }
          prev.push(item[ind]);
          return prev;
        }, []);
        return getAverage(reduced);
      });
      const calls = findOriginal("calls");
      const recognized = findOriginal("recognized");
      const script = findOriginal("script");
      const converse = Math.sqrt(
        Math.pow(
          Math.round((100 / calls) * (recognized + (script > 0 ? 0 : script))),
          2
        )
      );
      setTotal({
        calls,
        recognized,
        script,
        converse,
        error,
        rates,
      });
    }
  }, [data, findOriginal, getAverage]);

  useEffect(() => {
    const arr = data.map((i) => {
      return getAverage(i.rates);
    });
    setAverageRate(getAverage(arr));
  }, [data, getAverage]);

  function setCurrentRate(e, id, index) {
    e.preventDefault();
    setCurretntId(`${id}_rate-${index}`);
    setContextMenuOpened(true);
  }

  function checkRecognized(id) {
    if (props.changedIds.some((i) => i === id)) {
      return data.slice();
    } else {
      const current = data.find((i) => i.id === id);
      const manager = current.person_id;
      const copy = data.slice();
      const changedData = copy.map((i) => {
        if (i.person_id !== manager) {
          return i;
        } else {
          const item = JSON.parse(JSON.stringify(i));
          item.recognized = i.recognized + 1;
          item.script = i.script + 1;
          console.log(item.recognized + (item.script > 0 ? 0 : item.script));
          item.converse = Math.sqrt(
            Math.pow(
              Math.round(
                (100 / item.calls) *
                  (item.recognized + (item.script > 0 ? 0 : item.script))
              ),
              2
            )
          );
          return item;
        }
      });
      return changedData;
    }
  }

  function setRate(id, index, rate) {
    const currentIndex = data.findIndex((i) => i.id === id);
    const currentRates = data[currentIndex].rates.slice();
    let numberRate = 0;
    if (rate === "bad") {
      numberRate = -1;
    } else if (rate === "awesome") {
      numberRate = 1;
    } else {
      numberRate = 0;
    }
    const changedData = checkRecognized(id);
    currentRates[index] = numberRate;
    changedData[currentIndex].rates = currentRates;
    setNewData(changedData);
    setContextMenuOpened(false);
    setCurretntId("");
    setRatesUpdated(true);
  }

  function saveRecognize() {
    const ids = data.map((i) => i.id);
    ids.forEach((i) => {
      if (!props.changedIds.some((it) => it === i)) {
        const arr = props.changedIds.slice();
        arr.push(i);
        props.setChangedIds(arr);
      }
    });
    props.setRecognizedData(data);
    props.setRatesOpened(false);
  }

  return (
    <section className="Rate">
      <div className="Rate__content">
        <article className="Rate__content-header">
          <p className="Rate__content-header_title">
            Качество обработки новых звонков
          </p>
          <div className="Rate__content-header_buttons">
            <div className="Rate__content-header_button">
              <Sprite
                src={question}
                width="20"
                height="20"
                title="кликните правой клавишей мыши на ячейке чтоб изменить"
                id="question"
              />
            </div>
            <div
              onClick={saveRecognize}
              className="Rate__content-header_button"
            >
              <Sprite
                src={arrow} /*
              style={{ transform: "rotate(180deg)" }} */
                width="12"
                height="8"
                title="сохранить и закрыть"
                id="arrow"
              />
            </div>
          </div>
        </article>
        <div className="Rate__content-item">
          <p className="Rate__content-item_text Rate__content-item_text_manager">
            Менеджер
          </p>
          <div className="Rate__content-item_text Rate__content-item_text_calls">
            <p className="Rate__content-item_text_call">
              Разговоров
              <span className="Rate__content-item_text Rate__content-item_text_clarification">
                шт
              </span>
            </p>
            <p className="Rate__content-item_text_call">
              Распознано / По скрипту
              <span className="Rate__content-item_text Rate__content-item_text_clarification">
                %
              </span>
            </p>
          </div>
          <p className="Rate__content-item_text Rate__content-item_text_converse">
            Конверсия
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Приветствовал клиента
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Спросил<br></br>имя
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Правильно озвучил цену
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Сказал<br></br>про скидку
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Сохранил предзаказ
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Поблагодарил за звонок
          </p>
          <p className="Rate__content-item_text Rate__content-item_text_cell">
            Без стоп<br></br>слов
          </p>
          <p
            style={{ marginLeft: "-20px" }}
            className="Rate__content-item_text Rate__content-item_text_cell"
          >
            Оценка
          </p>
        </div>
        {total ? (
          <div className="Rate__content-item">
            <p className="Rate__content-item_text Rate__content-item_text_manager Rate__content-item_text_total">
              Все
            </p>
            <div
              style={{
                padding: "11px, 0px",
                boxSizing: "border-box",
                flexWrap: "nowrap",
              }}
              className="Rate__content-item_text Rate__content-item_text_calls"
            >
              <div className="Rate__content-item_text Rate__content-item_text_calls Rate__content-item_text_statistic">
                <p className="Rate__content-item_text_call Rate__content-item_text_statistic">
                  {total.calls}
                </p>
                <p className="Rate__content-item_text_call Rate__content-item_text_statistic">
                  {`${total.recognized} / `}
                  <span
                    className={`Rate__content-item_text ${
                      total.script < 0
                        ? "Rate__content-item_text_red"
                        : "Rate__content-item_text_green"
                    }`}
                  >
                    {total.script > 0 ? total.script : 0}
                  </span>
                </p>
              </div>
              <div className="Rate__content-item_text Rate__content-item_text_calls Rate__content-item_text_lines">
                <div className="Rate__content-item_text_call Rate__content-item_text_lines"></div>
                <div
                  className="Rate__content-item_text_call Rate__content-item_text_lines Rate__content-item_text_line"
                  style={{
                    background: `linear-gradient(
                to right,
                ${
                  total.script - total.recognized < 0 ? "#ea1a4f" : "#00a775"
                } 0%,
                ${
                  total.script - total.recognized < 0 ? "#ea1a4f" : "#00a775"
                } ${Math.round((100 / total.calls) * total.recognized)}%,
                #d8e4fb ${Math.round((100 / total.calls) * total.recognized)}%,
                #d8e4fb 100%
              )`,
                  }}
                ></div>
              </div>
            </div>
            <p
              style={{
                color:
                  Math.round(Math.sqrt(Math.pow(total.converse, 2))) > 75
                    ? "#00a775"
                    : Math.round(Math.sqrt(Math.pow(total.converse, 2))) < 40
                    ? "#ea1a4f"
                    : "#122945",
              }}
              className="Rate__content-item_text Rate__content-item_text_converse"
            >
              {`${Math.round(Math.sqrt(Math.pow(total.converse, 2)))}%`}
            </p>
            {total.rates
              ? total.rates.map((item, index) => (
                  <div
                    key={`rate-${item}-${index}`}
                    className="Rate__content-item_text Rate__content-item_text_cell"
                  >
                    <div
                      className="Rate__content-item_text Rate__content-item_rate"
                      style={{
                        background: getRateColor(total.rates[index]),
                      }}
                    ></div>
                  </div>
                ))
              : ""}
            <p
              className="Rate__content-item_text Rate__content-item_text_cell"
              style={
                averageRate !== 0
                  ? { color: getRateColor(averageRate), marginLeft: "-20px" }
                  : { marginLeft: "-20px" }
              }
            >
              {getRate(averageRate)}
            </p>
          </div>
        ) : (
          ""
        )}
        {data.map((i, ind) => (
          <div key={ind} className="Rate__content-item">
            <div className="Rate__content-item_text Rate__content-item_text_manager">
              <img
                className="Rate__content-item_avatar"
                alt="аватар"
                src={i.person_avatar}
              />
              <div className="Rate__content-item_text Rate__content-item_text_manager-data">
                <p className="Rate__content-item_text">{`${i.person_name} ${i.person_surname}`}</p>
                <p className="Rate__content-item_text">нет данных</p>
              </div>
            </div>
            <div
              className="Rate__content-item_text Rate__content-item_text_calls"
              style={{
                padding: "11px, 0px",
                boxSizing: "border-box",
                flexWrap: "nowrap",
              }}
            >
              <div className="Rate__content-item_text Rate__content-item_text_calls Rate__content-item_text_statistic">
                <p className="Rate__content-item_text_call Rate__content-item_text_statistic">
                  {i.calls}
                </p>
                <p className="Rate__content-item_text_call Rate__content-item_text_statistic">
                  {`${i.recognized} / `}
                  <span
                    className={`Rate__content-item_text ${
                      i.script < 0
                        ? "Rate__content-item_text_red"
                        : "Rate__content-item_text_green"
                    }`}
                  >
                    {i.script > 0 ? i.script : 0}
                  </span>
                </p>
              </div>
              <div className="Rate__content-item_text Rate__content-item_text_calls Rate__content-item_text_lines">
                <div className="Rate__content-item_text_call Rate__content-item_text_lines"></div>
                <div
                  className="Rate__content-item_text_call Rate__content-item_text_lines Rate__content-item_text_line"
                  style={{
                    background: `linear-gradient(
                to right,
                ${i.script - i.recognized < 0 ? "#ea1a4f" : "#00a775"} 0%,
                ${
                  i.script - i.recognized < 0 ? "#ea1a4f" : "#00a775"
                } ${Math.round((100 / i.calls) * i.recognized)}%,
                #d8e4fb ${Math.round((100 / i.calls) * i.recognized)}%,
                #d8e4fb 100%
              )`,
                  }}
                ></div>
              </div>
            </div>
            <p
              style={{
                color:
                  Math.round(Math.sqrt(Math.pow(i.converse, 2))) > 75
                    ? "#00a775"
                    : Math.round(Math.sqrt(Math.pow(i.converse, 2))) < 40
                    ? "#ea1a4f"
                    : "#122945",
              }}
              className="Rate__content-item_text Rate__content-item_text_converse"
            >
              {`${Math.round(Math.sqrt(Math.pow(i.converse, 2)))}%`}
            </p>
            {i.rates.map((item, index) => (
              <div
                key={`rate-${item}-${index}`}
                className="Rate__content-item_text Rate__content-item_text_cell"
              >
                <div
                  id={`${i.id}_rate-${index}`}
                  onContextMenu={(e) => {
                    setCurrentRate(e, i.id, index);
                  }}
                  className="Rate__content-item_text Rate__content-item_rate"
                  style={{ background: getRateColor(i.rates[index]) }}
                >
                  {curretntId === `${i.id}_rate-${index}` &&
                  isContextMenuOpened ? (
                    <div className="Rate__content-item_contextMenu">
                      <div
                        onClick={() => {
                          setRate(i.id, index, "bad");
                        }}
                      >
                        <div
                          className="Rate__content-item_text Rate__content-item_rate"
                          style={{
                            background: "#ea1a4f",
                          }}
                          title="Плохо"
                        ></div>
                        <p>Плохо</p>
                      </div>
                      <div
                        onClick={() => {
                          setRate(i.id, index, "good");
                        }}
                      >
                        <div
                          className="Rate__content-item_text Rate__content-item_rate"
                          style={{
                            background: "#d8e4fb",
                          }}
                          title="Хорошо"
                        ></div>
                        <p>Хорошо</p>
                      </div>
                      <div
                        onClick={() => {
                          setRate(i.id, index, "awesome");
                        }}
                      >
                        <div
                          className="Rate__content-item_text Rate__content-item_rate"
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
              </div>
            ))}
            <p
              className="Rate__content-item_text Rate__content-item_text_cell"
              style={
                getAverage(i.rates) !== 0
                  ? {
                      color: getRateColor(getAverage(i.rates)),
                      marginLeft: "-20px",
                    }
                  : { marginLeft: "-20px" }
              }
            >
              {getRate(getAverage(i.rates))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Rate;
