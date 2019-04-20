import * as React from "react";

interface Props {
  dispatchFunction: (type: colorType) => void;
  color: colorType;
}

export const Button: React.FunctionComponent<Props> = ({
  color,
  dispatchFunction
}) => (
  <button
    id={`color${color}`}
    style={{
      color: color
    }}
    onClick={() => {
      const thisElement = document.getElementById(`color${color}`) || { style: { backgroundColor: 0 }};
      thisElement.style.backgroundColor = color;
      setTimeout(() => {
        thisElement.style.backgroundColor = 'white';
      }, 50);
      dispatchFunction(color);
    }}
  >
    {color}
  </button>
);
