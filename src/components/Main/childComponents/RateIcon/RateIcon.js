import React, { useEffect, useState } from "react";
import { getRateColor } from "../../../../utils/consts";
import "./RateIcon.css";

function RateIcon(props) {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    const array = [];
    for (let i = 0; i < props.average + 2; i++) {
      array.push(i);
    }
    setArr(array);
  }, [props.average]);

  return (
    <div className="RateIcon">
      {arr.map((i) => (
        <div
          key={`circle-${i}`}
          style={{ backgroundColor: getRateColor(props.average) }}
          className="RateIcon__circle"
        ></div>
      ))}
    </div>
  );
}

export default RateIcon;
