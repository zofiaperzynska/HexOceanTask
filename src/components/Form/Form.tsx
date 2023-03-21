import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  SelectChangeEvent,
  InputLabel,
  Button,
  Grid,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import {
  DEFAULT_SLIDER_VALUE,
  DISHES,
  INTEGER_REGEX,
  FLOAT_REGEX,
} from "./Form.consts";
import { Dayjs } from "dayjs";
import axios from "axios";

const Form = () => {
  const [selectedDish, setSelectedDish] = useState("");
  const [noOfSlices, setNoOfSlices] = useState("");
  const [noOfBreadSlices, setNoOfBreadSlices] = useState("");
  const [dishName, setDishName] = useState("");
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
  const [diameterValue, setDiameterValue] = useState("");
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);

  const selectDishHandler = (event: SelectChangeEvent) => {
    setSelectedDish(event.target.value);
  };

  const inputNoOfSlicesHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "" || INTEGER_REGEX.test(event.target.value)) {
      setNoOfSlices(event.target.value);
    }
  };

  const inputNoOfBreadSlicesHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "" || INTEGER_REGEX.test(event.target.value)) {
      setNoOfBreadSlices(event.target.value);
    }
  };

  const dishNameInputHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDishName(event.target.value);

  const inputDiameterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || FLOAT_REGEX.test(event.target.value)) {
      setDiameterValue(event.target.value);
    }
  };

  const sliderHandler = (
    event: {},
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  const getSpecificInputs = () => {
    switch (selectedDish) {
      case "pizza":
        return (
          <>
            <Grid item xs={6}>
              <TextField
                label='No Of Slices'
                type='text'
                value={noOfSlices}
                onChange={inputNoOfSlicesHandler}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label='Diameter'
                type='text'
                onChange={inputDiameterHandler}
                value={diameterValue}
              />
            </Grid>
          </>
        );
      case "soup":
        return (
          <Grid item xs={6}>
            <Slider
              defaultValue={DEFAULT_SLIDER_VALUE}
              step={1}
              marks
              min={1}
              max={10}
              onChange={sliderHandler}
              valueLabelDisplay='on'
              value={sliderValue}
            />
          </Grid>
        );
      case "sandwich":
        return (
          <Grid item xs={6}>
            <TextField
              label='No Of Bread Slices'
              type='text'
              value={noOfBreadSlices}
              onChange={inputNoOfBreadSlicesHandler}
            />
          </Grid>
        );
    }
  };

  const checkFormValidation = () => {
    switch (selectedDish) {
      case "pizza":
        return (
          !!dishName && timeValue?.isValid() && !!noOfSlices && !!diameterValue
        );

      case "soup":
        return !!dishName && timeValue?.isValid();

      case "sandwich":
        return !!dishName && timeValue?.isValid() && !!noOfBreadSlices;

      default:
        return false;
    }
  };

  const createQueryBody = () => {
    switch (selectedDish) {
      case "pizza":
        return {
          name: dishName,
          type: selectedDish,
          preparation_time: timeValue?.format("HH:mm:ss"),
          no_of_slices: parseInt(noOfSlices),
          diameter: parseFloat(diameterValue),
        };
      case "soup":
        return {
          name: dishName,
          type: selectedDish,
          preparation_time: timeValue?.format("HH:mm:ss"),
          spiciness_scale: sliderValue,
        };
      case "sandwich":
        return {
          name: dishName,
          type: selectedDish,
          preparation_time: timeValue?.format("HH:mm:ss"),
          slices_of_bread: parseInt(noOfBreadSlices),
        };
    }
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        createQueryBody()
      );
      console.log(response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(JSON.stringify(error.response?.data));
      }
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label='Dish Name'
            value={dishName}
            onChange={dishNameInputHandler}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TimeField
            label='Preparation Time'
            format='HH:mm:ss'
            value={timeValue}
            onChange={(newValue) => setTimeValue(newValue)}
          ></TimeField>
        </Grid>
        <Grid item xs={6}>
          <InputLabel id='dish-select-label'>Select Dish</InputLabel>
        </Grid>
        <Grid item xs={6}>
          <Select
            labelId='dish-select-label'
            label='Dish'
            onChange={selectDishHandler}
          >
            {DISHES.map((dish) => (
              <MenuItem value={dish.value}>{dish.label}</MenuItem>
            ))}
          </Select>
        </Grid>
        {getSpecificInputs()}
        <Grid item xs={6}>
          <Button
            variant='contained'
            type='submit'
            disabled={!checkFormValidation()}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
