import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import SalahSakhi from "./pages/SalahSakhi";
import TransactionForm from "./pages/TransactionForm";
import BachatSaathiPage from "./pages/BachatSaathi";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CreativeSavingsPlanPage from "./pages/SavingsPage";
import SmartNiveshPage from "./pages/SmartNivesh";
import LanguageSelection from "./pages/LanguageSelection";
import KahaniKosh from "./pages/KahaniKosh";
import ChapterPage from "./pages/ChapterPage";
import Saheli from "./pages/Saheli";
import Nirnay from "./pages/Nirnay";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LanguageSelection />} />
          <Route path="/home" element={<Home />} />
          <Route path="/salahsakhi" element={<SalahSakhi />} />
          <Route path="/kahani-kosh" element={<KahaniKosh />} />
          <Route path="/chapter/:id" element={<ChapterPage />} />
          <Route path="/detail" element={<TransactionForm />} />
          <Route path="/bachat-saathi" element={<BachatSaathiPage />} />
          <Route path="/smart-nivesh" element={<SmartNiveshPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/savings-plan" element={<CreativeSavingsPlanPage />} />
          <Route path="/saheli" element={<Saheli />} />
          <Route path="/nirnay" element={<Nirnay />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
