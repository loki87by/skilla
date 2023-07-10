import React, { useEffect, useState, useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { getRecord, getCallback } from "../../../../utils/Api.js";
import { getAverage } from "../../../../utils/consts.js";
import Player from "../Player/Player.js";
import Sprite from "../../../Sprite/Sprite.js";
import RateIcon from "../RateIcon/RateIcon.js";
import RateText from "../RateText/RateText.js";
import cross from "../../../../assets/cross.svg";
import download from "../../../../assets/download.svg";
import incomming from "../../../../assets/call_in.svg";
import outer from "../../../../assets/call_out.svg";
import phone from "../../../../assets/phone.svg";
import network from "../../../../assets/network.svg";
import "./Call.css";

function Call(props) {
  const [clicked, setClicked] = useState(false);
  const [focus, setFocus] = useState(false);
  const [audioSelect, setAudioSelect] = useState(false);
  const [record, setRecord] = useState(null);
  const [rate, setRate] = useState("");

  function click(e) {
    if (
      !e.target.parentElement.classList.contains("Call__check") &&
      clicked === false
    ) {
      setClicked(!clicked);
      props.setClicked(!clicked);
    }
  }
  useEffect(() => {
    if (props.rates) {
      const ind = props.rates.findIndex((i) => i.id === props.data.id);

      if (ind < 0) {
        return;
      } else {
        const rates = props.rates[ind].rates;
        /*
        const sum = rates.reduce((p, i) => {
          if (!p) {
            p = 0;
          }
          return p + i;
        }, 0); */
        const average = getAverage(rates) //sum > 0 ? Math.ceil(sum / 7) : Math.floor(sum / 7);
        setRate(average);
      }
    }
  }, [props.data.id, props.rates]);

  useEffect(() => {
    if (focus && props.data.record !== "" && props.data.partnership_id !== "") {
      getRecord(props.data.record, props.data.partnership_id)
        .then((blob) => {
          const url = window.URL.createObjectURL(
            new Blob([blob], { type: "audio/mpeg3" })
          );
          return url;
        })
        .then((res) => {
          setRecord(res);
        });
    }
  }, [focus, props.data.partnership_id, props.data.record]);

  const timeDecoder = (time) => {
    const mins = Math.floor(time / 60);
    const secs = time - mins * 60;

    if (secs < 10) {
      return `${mins}:0${secs}`;
    } else {
      return `${mins}:${secs}`;
    }
  };

  function check() {
    const arr = props.checkedSounds;

    if (
      props.data.record &&
      props.data.partnership_id &&
      !arr.find((item) => item.id === props.data.id)
    ) {
      getRecord(props.data.record, props.data.partnership_id).then((res) => {
        arr.push({ sound: res, id: props.data.id });
      });
      props.setCheckedSounds(arr);
    }
  }

  function checkAll() {
    const arr = props.checkedSounds;
    props.withAudioArray.forEach((i) => {
      if (!arr.find((item) => item.id === i.id)) {
        getRecord(i.record, i.partnership_id).then((res) => {
          arr.push({ sound: res, id: i.id });
        });
      }
    });
    props.setCheckedSounds(arr);
  }

  function unCheck() {
    const index = props.checkedSounds.findIndex((i) => i.id === props.data.id);
    const start = props.checkedSounds.slice(0, index);
    const end = props.checkedSounds.slice(index + 1);
    const arr = [...start, ...end];
    props.setCheckedSounds(arr);
  }

  function changeCheck(e) {
    if (!e.target.checked) {
      unCheck();
    } else {
      check();
    }
  }

  const quantityAudio = () => {
    if (props.checkedSounds.length === 0) {
      return "Файлы не выбраны";
    } else if (props.checkedSounds.length === 1) {
      return "Выбран 1 аудиофайл";
    } else if (props.checkedSounds.length < 5) {
      return `Выбрано ${props.checkedSounds.length} аудиофайла`;
    } else {
      return `Выбрано ${props.checkedSounds.length} аудиофайлов`;
    }
  };

  function closeAlternete() {
    setAudioSelect(false);
  }

  const downloadZip = useCallback(async () => {
    const zip = new JSZip();
    const audioFolder = zip.folder("records");
    props.checkedSounds.forEach((audioBlob, index) => {
      audioFolder.file(`record_${index}.mp3`, audioBlob.sound, { blob: true });
    });
    zip.generateAsync({ type: "blob" }).then(function (content) {
      saveAs(content, "records.zip");
    });
  }, [props.checkedSounds]);

  function checkFocus(e) {
    if (e.target.classList[0] && !e.target.classList[0].includes("Player")) {
      setFocus(false);
    }
  }

  function initCall(phone) {
    getCallback(phone).then((res) => {
      console.log(res);
    });
  }

  function recognize(data) {
    props.setRatesData(data);
    props.setRatesOpened(true);
  }

  function recognizeAll(all, current) {
    const selected = current.map((i) => {
      const ind = all.findIndex((it) => it.id === i.id);
      return all[ind];
    });
    recognize(selected);
  }

  return (
    <li
      onMouseOut={(e) => {
        checkFocus(e);
      }}
      onMouseOver={() => {
        setFocus(true);
      }}
    >
      <div className="Call" onClick={click}>
        <div className="Call__check">
          {clicked ? (
            <>
              <input
                type="checkbox"
                className="Call__input"
                id={`Call__input_id-${props.data.id}`}
                onChange={changeCheck}
              />
              <label htmlFor={`Call__input_id-${props.data.id}`}></label>
            </>
          ) : (
            ""
          )}
        </div>
        <img
          src={props.data.in_out === 1 ? incomming : outer}
          alt={props.data.in_out === 1 ? "входящий" : "исходящий"}
          className="Call__type"
        />
        <time className="Call__time">
          {props.data.date.replace(props.data.date_notime, "").slice(1, 6)}
        </time>
        <img
          className="Call__worker"
          src={props.data.person_avatar}
          alt="аватар"
        />
        <div className="Call__icons">
          {props.data.source !== "" ? (
            <div className="Call__icon">
              <img src={network} alt="звонок с сайта" />
            </div>
          ) : (
            <div className="Call__icon"></div>
          )}
          {focus ? (
            <img
              src={phone}
              onClick={() => {
                initCall(props.data.partner_data.phone);
              }}
              alt="позвонить"
              className="Call__icon"
            />
          ) : (
            <div className="Call__icon"></div>
          )}
        </div>
        <p className="Call__phone">{props.data.partner_data.phone}</p>
        <p className="Call__src">{props.data.source}</p>
        {audioSelect ? (
          <div className="Call__select">
            <p>{`${quantityAudio()}`}</p>
            <p
              className="Call__select-button"
              onClick={checkAll}
            >{`Выбрать все ${props.withAudioArray.length}`}</p>
            <p
              className="Call__select-button"
              onClick={() => {
                recognizeAll(props.withAudioArray, props.checkedSounds);
              }}
            >
              Распознать все
            </p>
            <Sprite
              src={download}
              click={downloadZip}
              class="Player_download"
              width="13"
              height="18"
              title="выбрать"
              id="download"
            />
            <Sprite
              src={cross}
              click={closeAlternete}
              class="Player_close"
              width="14"
              height="14"
              title="переключить"
              id="cross"
            />
          </div>
        ) : (
          <>
            {rate !== "" ? (
              <div className="Call__rating">
                <RateIcon average={rate} />
                <RateText average={rate} />
              </div>
            ) : props.data.errors.length > 0 ? (
              <p className="Call__rating Call__rating-noscript">
                {props.data.errors[0]}
              </p>
            ) : props.data.record !== "" ? (
              <button
                className="Call__rating Call__rating-button"
                onClick={() => {
                  recognize([props.data]);
                }}
              >
                Распознать
              </button>
            ) : (
              <p className="Call__rating"></p>
            )}
            <Player
              sound={record}
              focus={focus}
              id={props.data.id}
              setAudioSelect={setAudioSelect}
              time={timeDecoder(props.data.time)}
              timeDecoder={timeDecoder}
            />
            <p
              className={`Call__record ${
                focus && props.data.record !== "" && "hidden"
              }`}
            >
              {timeDecoder(props.data.time) !== "0:00"
                ? timeDecoder(props.data.time)
                : ""}
            </p>
          </>
        )}
      </div>
    </li>
  );
}

export default Call;
