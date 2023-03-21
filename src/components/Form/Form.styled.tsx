import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Slider from "@mui/material/Slider";
import { LIGHT_BLUE, DARK_BLUE } from "./Form.consts";

export const CustomTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: `${LIGHT_BLUE}`,
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: `${DARK_BLUE}`,
    },
    "&.Mui-focused fieldset": {
      borderColor: `${LIGHT_BLUE}`,
    },
  },
});

export const CustomButton = styled(Button)({
  backgroundColor: `${DARK_BLUE}`,
  "&:hover": {
    backgroundColor: `${LIGHT_BLUE}`,
  },
});

export const CustomAvatar = styled(Avatar)({
  m: 1,
  backgroundColor: `${DARK_BLUE}`,
  display: "flex",
  justifyContent: "center",
});

export const CustomSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    color: `${DARK_BLUE}`,
  },
  "& .MuiSlider-track": {
    color: `${DARK_BLUE}`,
  },
  "& .MuiSlider-rail": {
    color: `${DARK_BLUE}`,
  },
});
