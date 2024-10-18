import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Filmes from "./pages/Filmes";
import Header from "./components/Header.js";
import Erro from "./pages/Erro/index.js";
import Favoritos from "./pages/Favoritos/index.js";

function RouterApp() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/filme/:id" element={<Filmes />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="*" element={<Erro />} />
        </Routes>
      </BrowserRouter>
      ;
    </>
  );
}

export default RouterApp;
