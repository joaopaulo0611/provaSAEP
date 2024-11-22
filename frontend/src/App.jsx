import React from "react"
import Cadastro from "./pages/cadastro"
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/login";
import Home from "./pages/home";

function App() {

  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App;
