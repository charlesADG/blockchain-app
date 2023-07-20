import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import hotelImage from "./assets/hotel.jpg";
import InputLabel from "@mui/material/InputLabel";

const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  background: `url(${hotelImage}) no-repeat center center fixed`,
  backgroundSize: "cover",
});

const FormContainer = styled("div")({
  background: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "30vw",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
});

const ViewHotelReservation = () => {
  return (
    <div>
      <Container>
        <FormContainer>
          <Stack direction="column" spacing={2}>
            <h2>Hotel Reservation</h2>
          </Stack>
        </FormContainer>
      </Container>
    </div>
  );
};

export default ViewHotelReservation;
