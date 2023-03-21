import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TimeField } from "@mui/x-date-pickers";
import Avatar from "@mui/material/Avatar";

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
