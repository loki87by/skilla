import React from "react";
import Balance from "../Balance/Balance";
import Timelaps from "../Timelaps/Timelaps";
import "./Info.css";

function Info(props) {
  return (
    <article className="Info">
      <Balance />
      <Timelaps
        startDate={props.startDate}
        endDate={props.endDate}
        setStartDate={props.setStartDate}
        setEndDate={props.setEndDate}
      />
    </article>
  );
}

export default Info;
