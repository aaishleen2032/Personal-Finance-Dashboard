import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import CTC from "./pages/CTC";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EMI from "./pages/EMI";
import Tax from "./pages/Tax";
import OfferComparator from "./pages/OfferComparator";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ctc" element={<CTC />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/emi" element={<EMI />} />
        <Route path="/tax" element={<Tax />} />
        <Route
    path="/offer"
    element={<OfferComparator />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;