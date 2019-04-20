import { colors } from "./constants";

interface ActionObject {
  type: string;
  payload: any;
}

export const reducer = (state: any, action: ActionObject) => {
  switch (action.type) {
    case "SET_COLOR":
      if (state.currentColor === action.payload) return state;
      return {
        currentPlayer: state.currentPlayer === 0 ? 1 : 0,
        currentColor: action.payload,
        zone: getNewZoneFromColor(
          state.zone,
          state.currentPlayer,
          action.payload
        )
      };

    default:
      state;
  }
};

const getNewZoneFromColor = (
  zone: any[][],
  currentPlayer: 0 | 1,
  color: colorType
) => {
  return zone.map(line =>
    line.map(col => {
      if (col.ownedBy === currentPlayer) {
        return {
          ...col,
          color
        };
      }
      if (col.color === color && col.ownedBy === null) {
        if (
          isBeingCaptured(
            zone,
            currentPlayer,
            col.lineIndex,
            col.colIndex
          )
        ) {
          return {
            ...col,
            ownedBy: currentPlayer
          };
        }
      }

      return col;
    })
  );
};

const getIsOwned = (zone: any[][], currentPlayer: 0 | 1) => (indexes: number[]) => {
  const [i, j] = indexes;
  const line = zone[i];
  if (line) {
    const element = line[j];
    return (
      element && element.ownedBy === currentPlayer
    );
  }
  return false;
};

const isBeingCaptured = (
  zone: any[][],
  currentPlayer: 0 | 1,
  lineIndex: number,
  colIndex: number
): boolean => {
  const isOwned = getIsOwned(zone, currentPlayer);
  const pair = lineIndex % 2;
  return [
    [lineIndex, colIndex - 1],
    [lineIndex, colIndex + 1],
    [lineIndex - 1, pair ? colIndex - 1 : colIndex],
    [lineIndex - 1, pair ? colIndex - 1 : colIndex],
    [lineIndex + 1, pair ? colIndex - 1 : colIndex],
    [lineIndex + 1, pair ? colIndex : colIndex + 1]
  ].some(isOwned);
};

const getColor = () => {
  const random = Math.floor((Math.random() * 100) % 6);
  return colors[random];
};

const generateHexaProps = (colIndex: number, lineIndex: number) => ({
  color: getColor(),
  ownedBy: getOwnedBy(colIndex, lineIndex),
  colIndex,
  lineIndex
});

const getOwnedBy = (colIndex: number, lineIndex: number) => {
  if (colIndex === 0 && lineIndex === 0) {
    return 0;
  } else if (lineIndex === 24 && colIndex === 49) {
    return 1;
  } else {
    return null;
  }
};

export const initialState = {
  zone: Array(25)
    .fill(0)
    .map((_, lineNumber) =>
      Array(50)
        .fill(0)
        .map((_, colNumber) => generateHexaProps(colNumber, lineNumber))
    ),
  currentPlayer: 0,
  currentColor: null
};
