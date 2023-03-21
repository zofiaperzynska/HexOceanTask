import React, { ReactElement } from "react";
import { Box, Container, CssBaseline } from "@mui/material";

interface CardProps {
  children: ReactElement;
}

const Card = (props: CardProps) => (
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
        {props.children}
      </div>
    </Box>
  </Container>
);

export default Card;
