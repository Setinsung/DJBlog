import { colors, colors2 } from './constants';

export const randomNum = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomColor = () => {
  return colors[randomNum(colors.length, 0)];
};

export const randomColor2 = () => {
  return colors2[randomNum(colors2.length, 0)];
};
