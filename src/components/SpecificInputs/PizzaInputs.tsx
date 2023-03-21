import React from "react";
import { Grid } from "@mui/material";
import { CustomTextField } from "../Form/Form.styled";

interface PizzaInputsProps {
  noOfSlices: string;
  inputNoOfSlicesHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  diameterValue: string;
  inputDiameterHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PizzaInputs = (props: PizzaInputsProps) => (
  <>
    <Grid item xs={12} sm={6}>
      <CustomTextField
        label='No Of Slices'
        type='text'
        value={props.noOfSlices}
        onChange={props.inputNoOfSlicesHandler}
        required
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <CustomTextField
        label='Diameter'
        type='text'
        onChange={props.inputDiameterHandler}
        value={props.diameterValue}
        required
      />
    </Grid>
  </>
);

export default PizzaInputs;
