import React, { useEffect, useMemo, useState, useCallback } from "react";
import Sprite from "../Sprite/Sprite";
import cross from "../../assets/cross.svg";
import download from "../../assets/download.svg";
import player from "../../assets/play.svg";
import paused from "../../assets/pause.svg";
import "./Player.css";

function Player(props) {
  const [isSoundPlayed, setSoundPlayed] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const [outputProgress, setOutputProgress] = useState(0);
  const [outputPosition, setOutputPosition] = useState(0);
  const [isInputHover, setInputHover] = useState(false);

  const song = useMemo(() => {
    const track = new Audio();
    track.src = props.sound;
    track.onloadedmetadata = function () {
      setDuration(Math.floor(track.duration));
    };
    return track;
  }, [props.sound]);

  function play() {
    if (progress >= duration) {
      song.currentTime = 0;
      setProgress(0);
    }
    setSoundPlayed(true);
    song.play();
  }

  const pause = useCallback(() => {
    setSoundPlayed(false);
    song.pause();
  }, [song]);

  const stop = useCallback(() => {
    setSoundPlayed(false);
    song.pause();
    song.currentTime = 0;
    setProgress(0);
  }, [song]);

  useEffect(() => {
    if (isSoundPlayed) {
      const step = setInterval(() => {
        const currentTime = song.currentTime;
        setProgress(currentTime);
      }, 1000);

      if (progress >= duration) {
        stop();
      }
      return () => clearInterval(step);
    }
  }, [duration, isSoundPlayed, progress, song, song.currentTime, stop]);

  function goToTime(e) {
    song.currentTime = e.target.value;
    setProgress(e.target.value);
  }

  function move(e) {
    const leftStart = 1508;
    const width = 164;
    const step = Math.floor(duration) / width;
    const startCountdown = e.pageX - leftStart;
    const time = Math.floor(startCountdown * step);
    const numbersTime = props.timeDecoder(time);
    setOutputProgress(numbersTime);
    setOutputPosition(e.pageX - leftStart + 88);
  }

  function playOrPause() {
    if (isSoundPlayed) {
      pause();
    } else {
      play();
    }
    setSoundPlayed(!isSoundPlayed);
  }

    function save() {
    const link = document.createElement("a");
    link.download = 'record.mp3';
    link.href = props.sound;
    link.click();
    link.remove()
  }

  function showAlternete() {
    props.setAudioSelect(true);
    if(isSoundPlayed) {
      pause();
    }
  }

  useEffect(() => {
    if (!props.focus) {
      pause();
      setSoundPlayed(false);
    }
  }, [pause, props.focus]);

  return (
    <section className={`Player ${!(props.focus && props.sound) && "hidden"}`}>
      <time className="Player_duration">{props.time}</time>
      <img
        src={!isSoundPlayed ? player : paused}
        alt={!isSoundPlayed ? "играть" : "пауза"}
        className="Player_button"
        onClick={playOrPause}
      />
      <input
        type="range"
        value={progress}
        min="0"
        max={Math.floor(duration)}
        step="1"
        onInput={goToTime}
        onMouseOver={() => {
          setInputHover(true);
        }}
        onMouseOut={() => {
          setInputHover(false);
        }}
        onMouseMove={move}
        className="Player_process"
        style={{
          background: `linear-gradient(
                to right,
                var(--secondary-color) 0%,
                var(--secondary-color) ${
                  (100 / Math.floor(duration)) * progress
                }%,
                var(--primary-color) ${
                  (100 / Math.floor(duration)) * progress
                }%,
                var(--primary-color) 100%
              )`,
        }}
      />
      {isInputHover && !props.audioSelect ? (
        <output
          className="Player_process-output"
          style={{ left: `${outputPosition - 10}px` }}
        >
          {outputProgress}
        </output>
      ) : (
        ""
      )}
      <Sprite
        src={download}
        click={save}
        class="Player_download"
        width="13"
        height="18"
        title="выбрать"
        id="download"
      />
      <Sprite
        src={cross}
        click={showAlternete}
        class="Player_close"
        width="14"
        height="14"
        title="переключить"
        id="cross"
      />
    </section>
  );
}

export default Player;
