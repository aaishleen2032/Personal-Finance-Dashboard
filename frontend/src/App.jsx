import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import CTC from "./pages/CTC";
import EMI from "./pages/EMI";
import Tax from "./pages/Tax";
import OfferComparator from "./pages/OfferComparator";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
    return (
        <BrowserRouter>

            <Navbar />

            <main>
                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route path="/ctc" element={<CTC />} />

                    <Route path="/emi" element={<EMI />} />

                    <Route path="/tax" element={<Tax />} />

                    <Route
                        path="/offer"
                        element={<OfferComparator />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                </Routes>
            </main>

        </BrowserRouter>
    );
}

export default App;