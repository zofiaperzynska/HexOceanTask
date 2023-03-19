import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Form from "./components/Form/Form";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Form />
    </LocalizationProvider>
  );
}

export default App;
