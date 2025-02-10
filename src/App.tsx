import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QR from "./pages/QR/QR.tsx";
import Login from "./pages/Login/Login.tsx";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QR />} />
          <Route path="/login" element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
