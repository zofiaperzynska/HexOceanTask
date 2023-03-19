import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  SelectChangeEvent,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { DISHES } from "./Form.consts";

const Form = () => {
  const [selectedDish, setSelectedDish] = useState("");

  const selectDishHandler = (event: SelectChangeEvent) => {
    setSelectedDish(event.target.value);
  };

  const getSpecificInputs = () => {
    switch (selectedDish) {
      case "pizza":
        return (
          <>
            <TextField
              label='no of slices'
              type='number'
              inputProps={{ min: 1, max: 12 }}
            />
            <TextField label='diameter' type='number' />
          </>
        );
      case "soup":
        return <Slider defaultValue={3} step={1} marks min={1} max={10} />;
      case "sandwich":
        return <TextField type='number' inputProps={{ min: 1 }} />;
    }
  };

  return (
    <form>
      <TextField></TextField>
      <TimePicker></TimePicker>
      <Select label='Dish' onChange={selectDishHandler}>
        {DISHES.map((dish) => (
          <MenuItem value={dish.value}>{dish.label}</MenuItem>
        ))}
      </Select>
      {getSpecificInputs()}
    </form>
  );
};

export default Form;
