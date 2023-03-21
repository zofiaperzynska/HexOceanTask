import React, { useState } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";
import { MenuItem, Grid, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import {
  DEFAULT_SLIDER_VALUE,
  DISHES,
  INTEGER_REGEX,
  FLOAT_REGEX,
} from "./Form.consts";
import { CustomTextField, CustomButton, CustomAvatar } from "./Form.styled";
import PizzaInputs from "../SpecificInputs/PizzaInputs";
import SoupInputs from "../SpecificInputs/SoupInputs";
import SandwichInputs from "../SpecificInputs/SandwichInputs";
import ErrorAlert from "../Alerts/ErrorAlert";
import SuccessAlert from "../Alerts/SuccessAlert";
import Card from "../Card/Card";

const Form = () => {
  const [selectedDish, setSelectedDish] = useState("");
  const [noOfSlices, setNoOfSlices] = useState("");
  const [noOfBreadSlices, setNoOfBreadSlices] = useState("");
  const [dishName, setDishName] = useState("");
  const [sliderValue, setSliderValue] = useState(DEFAULT_SLIDER_VALUE);
  const [diameterValue, setDiameterValue] = useState("");
  const [timeValue, setTimeValue] = useState<Dayjs | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successSubmit, setSuccessSubmit] = useState(false);

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

  const inputDishNameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDishName(event.target.value);

  const inputDiameterHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === "" || FLOAT_REGEX.test(event.target.value)) {
      setDiameterValue(event.target.value);
    }
  };

  const changeSliderValueHandler = (
    event: {},
    value: number | number[],
    activeThumb: number
  ) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  const closeErrorAlertHandler = () => setErrorMessage("");

  const closeSuccessAlertHandler = () => setSuccessSubmit(false);

  const createQueryBody = () => {
    const commonBody = {
      name: dishName,
      type: selectedDish,
      preparation_time: timeValue?.format("HH:mm:ss"),
    };
    switch (selectedDish) {
      case "pizza":
        return {
          ...commonBody,
          no_of_slices: parseInt(noOfSlices),
          diameter: parseFloat(diameterValue),
        };
      case "soup":
        return {
          ...commonBody,
          spiciness_scale: sliderValue,
        };
      case "sandwich":
        return {
          ...commonBody,
          slices_of_bread: parseInt(noOfBreadSlices),
        };
    }
  };

  const clearForm = () => {
    setSelectedDish("");
    setNoOfSlices("");
    setNoOfBreadSlices("");
    setDishName("");
    setSliderValue(DEFAULT_SLIDER_VALUE);
    setDiameterValue("");
    setTimeValue(null);
  };

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/",
        createQueryBody()
      );
      console.log(response.data);
      setSuccessSubmit(true);
      clearForm();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(JSON.stringify(error.response?.data));
        return;
      }
      alert(error);
    }
  };

  const validateForm = () => {
    const commonValidation = !!dishName && timeValue?.isValid();
    switch (selectedDish) {
      case "pizza":
        return commonValidation && !!noOfSlices && !!diameterValue;
      case "soup":
        return commonValidation;
      case "sandwich":
        return commonValidation && !!noOfBreadSlices;
      default:
        return false;
    }
  };

  const getSpecificInputs = () => {
    switch (selectedDish) {
      case "pizza":
        return (
          <PizzaInputs
            noOfSlices={noOfSlices}
            inputNoOfSlicesHandler={inputNoOfSlicesHandler}
            diameterValue={diameterValue}
            inputDiameterHandler={inputDiameterHandler}
          />
        );
      case "soup":
        return (
          <SoupInputs
            sliderValue={sliderValue}
            changeSliderValueHandler={changeSliderValueHandler}
          />
        );
      case "sandwich":
        return (
          <SandwichInputs
            noOfBreadSlices={noOfBreadSlices}
            inputNoOfBreadSlicesHandler={inputNoOfBreadSlicesHandler}
          />
        );
    }
  };

  return (
    <>
      <ErrorAlert
        errorMessage={errorMessage}
        closeErrorAlertHandler={closeErrorAlertHandler}
      />
      <SuccessAlert
        successSubmit={successSubmit}
        closeSuccessAlertHandler={closeSuccessAlertHandler}
      />
      <form onSubmit={submitHandler}>
        <Card>
          <Grid container spacing={2}>
            <Grid item xs={12} display='flex' justifyContent={"center"}>
              <CustomAvatar>
                <RestaurantIcon />
              </CustomAvatar>
            </Grid>
            <Grid item xs={12} display='flex' justifyContent={"center"}>
              <Typography
                component='h1'
                variant='h5'
                style={{
                  marginBottom: 30,
                  display: "flex",
                  justifyContent: "center",
                  color: "#003973",
                }}
              >
                HexOcean Dish Form
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                label='Dish Name'
                value={dishName}
                onChange={inputDishNameHandler}
                required
                sx={{
                  width: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimeField
                label='Preparation Time'
                format='HH:mm:ss'
                value={timeValue}
                onChange={(newValue) => setTimeValue(newValue)}
                required
                sx={{
                  "& label.Mui-focused": {
                    color: "#2bb7e2",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#003973",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#2bb7e2",
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Dish'
                onChange={(event) => setSelectedDish(event.target.value)}
                value={selectedDish}
                select
                sx={{ width: "100%" }}
                required
              >
                {DISHES.map((dish) => (
                  <MenuItem key={dish.value} value={dish.value}>
                    {dish.label}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
            {getSpecificInputs()}
            <Grid item xs={12} display='flex' justifyContent={"center"}>
              <CustomButton
                variant='contained'
                type='submit'
                disabled={!validateForm()}
              >
                Submit
              </CustomButton>
            </Grid>
          </Grid>
        </Card>
      </form>
    </>
  );
};

export default Form;
