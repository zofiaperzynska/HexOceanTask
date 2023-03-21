import { Option } from "./Form.types";

export const DISHES: Option[] = [
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

export const MARKS = [
  {
    value: 1,
    label: "mild",
  },
  {
    value: 5.5,
    label: "medium",
  },
  {
    value: 10,
    label: "spicy",
  },
];
