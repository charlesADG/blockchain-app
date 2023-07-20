import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HotelReservation from "./HotelReservation";
import ViewHotelReservation from "./ViewHotelReservation";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelReservation />} />
          <Route path="/HotelReservation" element={<ViewHotelReservation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
