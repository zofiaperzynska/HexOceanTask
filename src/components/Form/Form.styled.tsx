import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Slider from "@mui/material/Slider";

export const CustomTextField = styled(TextField)({
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
});

export const CustomButton = styled(Button)({
  backgroundColor: "#003973",
  "&:hover": {
    backgroundColor: "#2bb7e2",
  },
});

export const CustomAvatar = styled(Avatar)({
  m: 1,
  backgroundColor: "#003973",
  display: "flex",
  justifyContent: "center",
});

export const CustomSlider = styled(Slider)({
  "& .MuiSlider-thumb": {
    color: "#003973",
  },
  "& .MuiSlider-track": {
    color: "#003973",
  },
  "& .MuiSlider-rail": {
    color: "#003973",
  },
});
