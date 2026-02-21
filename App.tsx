
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Advantages from "./pages/Advantages";
import Classes from "./pages/Classes";
import FindGym from "./pages/FindGym";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Contact from "./pages/Contact";
import Faq from "./pages/Faq";
import Gallery from "./pages/Gallery";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="advantages" element={<Advantages />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="classes" element={<Classes />} />
        <Route path="find-gym" element={<FindGym />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="faq" element={<Faq />} />
        <Route path="contact" element={<Contact />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
