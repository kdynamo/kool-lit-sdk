export const PositionXState = {
    left: 'left',
    center: 'center',
    right: 'right'
} as const;
export type PositionX = typeof PositionXState[keyof typeof PositionXState];

export const PositionYState = {
    top: 'top',
    center: 'center',
    bottom: 'bottom'
} as const;
export type PositionY = typeof PositionYState[keyof typeof PositionYState];

export type Position = `${PositionX}-${PositionY}`;


// getPositionOnScreen(oldX, oldY, box, true);

export interface GetPositionConfig {
  onScreen?: boolean;
  showLeft?: boolean;
  showTop?: boolean;
  
}


export interface PositionPx {
  x: number;
  y: number;
}

/*
           1200
  \--------|
   |.      |
  |________|

        |1100

        rightOverlay 1200 - 1100 = 100



*/
export const getDimensionOnScreen = (
  min: number,
  dimension: number,
  maxDimension: number,
  onScreen: boolean,
  showBegin: boolean = true,
) => {
  let newDimension = min;
  if (onScreen) {
    const max: number = min + dimension;
    const rightOverlap: number = maxDimension - max;
    if (dimension > maxDimension) {
      newDimension = showBegin ? 0 : rightOverlap;
    } else if (rightOverlap < 0) {
      newDimension = min + rightOverlap;
    } else if (min < 0) {
      newDimension = 0; 
    }
  }
  return newDimension;
};


export const getDimensionOnScreen2 = (
  min: number,
  max: number,
  dimension: number,
  maxDimension: number,
  onScreen: boolean,
  showBegin: boolean = true,
) => {
  let newDimension = min;
  const rightOverlap: number = maxDimension - dimension;
  if (onScreen) {
    if (dimension > maxDimension) {
      newDimension = showBegin ? 0 : (dimension - max);
    } else if (rightOverlap < 0) {
      newDimension = min + rightOverlap;
    } else if (min < 0) {
      newDimension = 0; 
    }
  }
  return newDimension;
};

export interface PositionDiffX {
  x: number;
  diffX: number;
}
export interface PositionDiffY {
  y: number;
  diffY: number;
}

export type PositionDiff = PositionDiffX & PositionDiffY;

export const getPositionOnScreen = (
  newX: number,
  newY: number,
  box: DOMRect, 
  config: GetPositionConfig,
): PositionPx => {

  const {
    width,
    height,
  } = box; 

  const {
    onScreen = true,
    showLeft = true,
    showTop = true,
  } = config;
  const x = getDimensionOnScreen(newX, width, window.innerWidth, onScreen, showLeft);
  const y = getDimensionOnScreen(newY, height, window.innerHeight, onScreen, showTop);

  return ({
    x, y
  });
}
export const getPositionOnScreen2 = (
  oldX: number,
  oldY: number,
  box: DOMRect, 
  config: GetPositionConfig,
): PositionDiff => {

  const {
    top,
    left,
    right,
    bottom,
    width,
    height,
  } = box; 

  const {
    onScreen = true,
    showLeft = true,
    showTop = true,
  } = config;
  const x = getDimensionOnScreen(left, width, window.innerWidth, onScreen, showLeft);
  const y = getDimensionOnScreen(top, height, window.innerHeight, onScreen, showTop);
  const diffX = x - oldX;
  const diffY = y - oldY;

  return ({
    x, y, diffX, diffY
  });
}

