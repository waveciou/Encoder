/**
  * 回傳亂數
  * @param { Number } min
  * @param { Number } max
  * @returns { Number }
  */

export default function (min: number, max: number) {
  return Math.floor(Math.random() * (max - min) + min);
}