import React, { useState } from "react";
import {
  TextField,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  DialogContentText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import hotelImage from "./assets/hotel.jpg";
import InputLabel from "@mui/material/InputLabel";
import Web3 from "web3";
import "./App.css";

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

function HotelReservation() {
  const [fullName, setFullName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkOutDate, setCheckOutDate] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleOpenDialog();
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleLogin = async () => {
    try {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setConnected(true);
      } else {
        alert("Please install MetaMask to use this feature");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setFullName("");
    setRoomName("");
    setSecurityDeposit("");
    setCheckInDate("");
    setRoomNumber("");
  };

  const handleClick = async () => {
    try {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      const txParams = {
        from: accounts[0],
        to: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
        value: web3.utils.toWei(securityDeposit, "ether"),
      };
      setLoading(true);
      await web3.eth.sendTransaction(txParams).on("confirmation", () => {
        console.log("Transaction confirmed");
        setLoading(false);
        setOpen(false);
        handleReset();
        window.ethereum.removeAllListeners("confirmation");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Stack direction="column" spacing={2}>
          <h2 className="flex text-center items-center justify-center font-bold text-2xl">
            Hotel Reservation
          </h2>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {connected ? (
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={handleLogin}
                  disabled
                >
                  Connect MetaMask
                </Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ mt: 3 }}
                  onClick={handleLogin}
                >
                  Connect MetaMask
                </Button>
              )}
              <TextField
                label="Full name"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <TextField
                label="Room number"
                type="number"
                required
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />
              <InputLabel htmlFor="check-in">Check In</InputLabel>
              <TextField
                id="check-in"
                type="date"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                
              />
              <InputLabel htmlFor="check-out">Check Out</InputLabel>
              <TextField
                id="check-out"
                type="date"
                required
                InputLabelProps={{
                  shrink: true,
                }}
                
              />
              <TextField
                label="Security deposit"
                type="number"
                required
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
                disabled={!connected}
              >
                Book now
              </Button>
              <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Confirm Booking</DialogTitle>
                <DialogContent>
                  Are you sure you want to book this room?
                </DialogContent>
                <DialogActions>
                  {loading ? (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <DialogContentText sx={{ marginLeft: "10px" }}>
                          Sending...
                        </DialogContentText>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => setOpen(false)}>Cancel</Button>
                      <Button onClick={handleClick}>Confirm</Button>
                    </>
                  )}
                </DialogActions>
              </Dialog>
            </Stack>
          </form>
        </Stack>
      </FormContainer>
    </Container>
  );
}

export default HotelReservation;
