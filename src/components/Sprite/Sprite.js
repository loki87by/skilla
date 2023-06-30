import React from "react";
import "./Sprite.css";

function Sprite(props) {

  return (
    <svg
    onClick={props.click}
      src={props.src}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.width}
      height={props.height}
      title={props.title}
      style={props.style}
      className={`${props.class} Sprite`}
    >
      <use
      className={`${props.class}`}
        style={{width: `${props.width}px`, height: `${props.height}px`}}
        href={`${props.src}#${props.id}`}
      />
    </svg>
  );
}

export default Sprite;
