import { wrapIndex } from "./misc";
import { randomOne } from "./random";

const someNiceColors = [
  "#F8BBD0",
  "#F48FB1",
  "#CE93D8",
  "#B39DDB",
  "#9FA8DA",
  "#90CAF9",
  "#81D4FA",
  "#80DEEA",
  "#80CBC4",
  "#A5D6A7",
  "#C5E1A5",
  "#E6EE9C",
  "#FFF59D",
  "#FFE082",
  "#FFCC80",
  "#FFAB91",
  "#FFCDD2",
  "#F0F4C3",
  "#DCEDC8",
  "#C8E6C9",
  "#B2DFDB",
  "#B3E5FC",
  "#B3E5FC",
  "#B2EBF2",
  "#B2EBF2",
  "#B2DFDB",
  "#D7CCC8",
  "#FFE0B2",
  "#FFCCBC",
  "#D1C4E9",
];

export const randomNiceColor = (ref?: string): string => {
  if (ref) return someNiceColors[wrapIndex(ref, someNiceColors)]!;
  return randomOne(someNiceColors)!;
};
