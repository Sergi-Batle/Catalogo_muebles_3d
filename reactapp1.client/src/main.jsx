import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Catalog from "./pages/Catalog.jsx";
import Admin from "./pages/Admin.jsx"
import './static/css/index.css';


createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <Routes>
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
);
