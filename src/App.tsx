import React, { useState, useEffect, useReducer } from "react";
import { Hexa } from "./Hexa";
import { reducer, initialState } from "./state";
import { Button } from "./Button";
import { colors } from "./constants";

export const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatcher = getDispatchColorAction(dispatch);
  return (
    <React.Fragment>
      <Svg zone={state.zone} />
      {buttons(dispatcher)}
    </React.Fragment>
  );
};

const getDispatchColorAction = (dispatch: any) => (color: colorType) =>
  dispatch({
    type: "SET_COLOR",
    payload: color
  });

const buttons = (dispatcher: any) =>
  colors.map(color => (
    <Button color={color} dispatchFunction={dispatcher} key={`color${color}`} />
  ));

const handleScreenSizeChange = (
  window: Window,
  setScreenSize: React.Dispatch<React.SetStateAction<number>>
) => () => {
  const listener = () => setScreenSize(window.innerWidth - 100);
  window.addEventListener("resize", listener);
  return () => window.removeEventListener("onresize", listener);
};

const Svg = ({ zone }: { zone: any[][] }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth - 100);
  useEffect(handleScreenSizeChange(window, setScreenSize), []);
  const elements = zone.map((line: any) =>
    line.map((props: any) => (
      <Hexa
        index={props.colIndex + 1}
        lineNumber={props.lineIndex + 1}
        key={`hexa${props.colIndex}${props.lineIndex}`}
        screenSize={screenSize}
        color={props.color}
      />
    ))
  );
  return (
    <svg
      id="svg"
      style={{
        position: "absolute",
        left: 0,
        top: '30px',
        width: "100%",
        height: "100%"
      }}
    >
      {elements}
    </svg>
  );
};
