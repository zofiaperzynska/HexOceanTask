import { Dish } from "./Form.types";

export const DISHES: Dish[] = [
  {
    label: "Pizza",
    value: "pizza",
  },
  {
    label: "Soup",
    value: "soup",
  },
  {
    label: "Sandwich",
    value: "sandwich",
  },
];

export const DEFAULT_SLIDER_VALUE = 3;

export const FLOAT_REGEX = /^(0|[1-9]\d*)(\.\d{0,2})?$/;

export const INTEGER_REGEX = /^[1-9][0-9]*$/;
