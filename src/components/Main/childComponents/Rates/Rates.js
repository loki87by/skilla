import React, { useCallback, useEffect, useState } from "react";
import { HEADER_CELLS } from "../../../../utils/consts";
import RateItem from "../RateItem/RateItem";
import Sprite from "../../../Sprite/Sprite";
import arrow from "../../../../assets/arrow.svg";
import question from "../../../../assets/question.svg";
import "./Rates.css";

function Rates(props) {
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [averageRate, setAverageRate] = useState([]);
  const [curretntId, setCurretntId] = useState("");
  const [total, setTotal] = useState(null);
  const [sorted, setSorted] = useState(null);
  const [isContextMenuOpened, setContextMenuOpened] = useState(false);
  const [isRatesUpdated, setRatesUpdated] = useState(false);

  useEffect(() => {
    if (isRatesUpdated && sorted !== null) {
      const array = data.slice();
      const rateIndex = HEADER_CELLS.findIndex((i) => i.key === sorted.key);

      if (sorted.dir) {
        array.sort((a, b) => {
          return a.rates[rateIndex] - b.rates[rateIndex];
        });
      } else {
        array.sort((a, b) => {
          return b.rates[rateIndex] - a.rates[rateIndex];
        });
      }
      setNewData(array);
    }
  }, [data, isRatesUpdated, sorted]);

  useEffect(() => {
    if (isRatesUpdated) {
      setData(newData);
      setRatesUpdated(false);
    }
  }, [data, isRatesUpdated, newData, props]);

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
    (param) => {
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
        Math.pow(Math.round((100 / calls) * recognized), 2)
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
          item.converse = Math.sqrt(
            Math.pow(Math.round((100 / item.calls) * item.recognized), 2)
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
    props.setRates(newData);
    props.setRatesOpened(false);
  }

  return (
    <section className="Rates">
      <div className="Rates__content">
        <article className="Rates__content-header">
          <p className="Rates__content-header_title">
            Качество обработки новых звонков
          </p>
          <div className="Rates__content-header_buttons">
            <div className="Rates__content-header_button">
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
              className="Rates__content-header_button"
            >
              <Sprite
                src={arrow}
                width="12"
                height="8"
                title="сохранить и закрыть"
                id="arrow"
              />
            </div>
          </div>
        </article>
        <RateItem
          isHeader={true}
          setSorted={setSorted}
          setRatesUpdated={setRatesUpdated}
        />
        {total ? (
          <RateItem isTotal={true} data={total} averageRate={averageRate} />
        ) : (
          ""
        )}
        {data.map((i, ind) => (
          <RateItem
            data={i}
            key={ind}
            curretntId={curretntId}
            isContextMenuOpened={isContextMenuOpened}
            setCurretntId={setCurretntId}
            setRate={setRate}
            getAverage={getAverage}
            setContextMenuOpened={setContextMenuOpened}
          />
        ))}
      </div>
    </section>
  );
}

export default Rates;
