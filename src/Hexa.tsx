import React from 'react';

interface Props {
  index: number;
  lineNumber: number;
  screenSize: number;
  color: string;
}

const numberOfElements = 50;
const elementWidth = 28;
const elementHeight = 31; 

export const Hexa: React.FunctionComponent<Props> = ({ index, lineNumber, screenSize, color }) => {
  const maxElementWidth = Math.floor(screenSize / numberOfElements);
  const maxElementHeight = (maxElementWidth * elementHeight) / elementWidth;
  const scale = maxElementWidth / elementWidth;


  const add = lineNumber % 2 ? 0 : maxElementWidth / 2;
  const x = 50 + index * maxElementWidth + add;
  const y = 25 + lineNumber * (maxElementHeight - maxElementHeight / 4);

  return (
    <g transform={`translate(${x} ${y}) rotate(90) scale(${scale})`}>
      <polygon points="30,15 22.5,28 7.5,28 0,15 7.5,2 22.5,2" fill={color} />
    </g>
  );
}
