// App.js
import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "./Login"
import Register from "./Register"
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from "./Navbar"
import Table from "./Table"
import Home from "./Home"
import Harcama from "./Harcama"

function App() {
  return (
    <div className="App">
      <Navbar />

      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/harcama" element={<Harcama />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
