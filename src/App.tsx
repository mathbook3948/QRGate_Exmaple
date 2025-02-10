import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QR from "./pages/QR/QR.tsx";
import Login from "./pages/Login/Login.tsx";
import Signup from "./pages/Signup/Signup.tsx";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QR />} />
          <Route path="/login" element={<Login />}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
