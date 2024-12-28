import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage";
import SalahSakhi from "./pages/SalahSakhi";
import TransactionForm from "./pages/TransactionForm";
import BachatSaathiPage from "./pages/BachatSaathi";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/salahsakhi" element={<SalahSakhi />} />
          <Route path="/detail" element={<TransactionForm />} />
          <Route path="/bachat-saathi" element={<BachatSaathiPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
