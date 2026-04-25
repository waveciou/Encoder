/**
 * 回傳亂數
 * @param { Number } min
 * @param { Number } max
 * @returns { Number }
 */

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};

export default getRandomNumber;
