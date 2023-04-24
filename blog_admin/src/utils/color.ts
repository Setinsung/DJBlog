import { colors } from './constants';

export const randomNum = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const randomColor = () => {
  return colors[randomNum(colors.length, 0)];
};
