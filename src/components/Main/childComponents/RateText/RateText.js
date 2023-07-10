import React from "react";
import { getRateColor, getRate } from "../../../../utils/consts";
import "./RateText.css";

function RateText(props) {
  const getBackground = () => {
    if (props.average === -1) {
      return "#fee9ef";
    } else if (props.average === 1) {
      return "#dbf8ef";
    } else {
      return "#d8e4fb";
    }
  };
  const getColor = () => {
    if (props.average === -1) {
      return getRateColor(props.average);
    } else if (props.average === 1) {
      return "#00a775";
    } else {
      return "#122945";
    }
  };

  return (
    <p
      className="RateText"
      style={{
        color: getColor(),
        backgroundColor: getBackground(),
        borderColor:
          props.average === 0 ? "#adbfdf" : getRateColor(props.average),
      }}
    >
      {getRate(props.average)}
    </p>
  );
}

export default RateText;
