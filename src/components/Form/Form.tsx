import React, { useState } from "react";
import {
  TextField,
  MenuItem,
  Slider,
  SelectChangeEvent,
  Button,
  Grid,
  Container,
  CssBaseline,
  Box,
  Alert,
  AlertTitle,
  Snackbar,
  Typography,
  Avatar,
} from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import {
  DEFAULT_SLIDER_VALUE,
  DISHES,
  INTEGER_REGEX,
  FLOAT_REGEX,
  MARKS,
} from "./Form.consts";
import { Dayjs } from "dayjs";
import axios from "axios";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { CustomTextField, CustomButton, CustomAvatar } from "./Form.styled";

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
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='No Of Slices'
                type='text'
                value={noOfSlices}
                onChange={inputNoOfSlicesHandler}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                label='Diameter'
                type='text'
                onChange={inputDiameterHandler}
                value={diameterValue}
                required
              />
            </Grid>
          </>
        );
      case "soup":
        return (
          <Grid item xs={12} marginTop='10px'>
            <Typography gutterBottom>Soup Spiciness</Typography>
            <Slider
              defaultValue={DEFAULT_SLIDER_VALUE}
              step={1}
              marks={MARKS}
              min={1}
              max={10}
              onChange={sliderHandler}
              valueLabelDisplay='auto'
              value={sliderValue}
              sx={{
                "& .MuiSlider-thumb": {
                  color: "#003973",
                },
                "& .MuiSlider-track": {
                  color: "#003973",
                },
                "& .MuiSlider-rail": {
                  color: "#003973",
                },
              }}
            />
          </Grid>
        );
      case "sandwich":
        return (
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label='No Of Bread Slices'
              type='text'
              value={noOfBreadSlices}
              onChange={inputNoOfBreadSlicesHandler}
              required
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

  const clearForm = () => {
    setSelectedDish("");
    setNoOfSlices("");
    setNoOfBreadSlices("");
    setDishName("");
    setSliderValue(DEFAULT_SLIDER_VALUE);
    setDiameterValue("");
    setTimeValue(null);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
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
      }
    }
  };

  const handleCloseErrorAlert = () => {
    setErrorMessage("");
  };

  const handleCloseSuccessAlert = () => {
    setSuccessSubmit(false);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={handleCloseErrorAlert}
      >
        <Alert
          onClose={handleCloseErrorAlert}
          severity='error'
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Snackbar
        open={successSubmit}
        autoHideDuration={6000}
        onClose={handleCloseSuccessAlert}
      >
        <Alert
          onClose={handleCloseSuccessAlert}
          severity='success'
          sx={{ width: "100%" }}
        >
          Your dish has been successfully submitted!
        </Alert>
      </Snackbar>

      <Container maxWidth='sm'>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              padding: 60,
              borderRadius: "10px",
              boxShadow:
                "rgba(0, 57, 115, 0.25) 0px 54px 55px, rgba(0, 57, 115, 0.12) 0px -12px 30px, rgba(0, 57, 115, 0.12) 0px 4px 6px, rgba(0, 57, 115, 0.17) 0px 12px 13px, rgba(0, 57, 115, 0.09) 0px -3px 5px",
            }}
          >
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
                  onChange={dishNameInputHandler}
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
                  disabled={!checkFormValidation()}
                >
                  Submit
                </CustomButton>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Container>
    </form>
  );
};

export default Form;
