import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import QR from "./pages/QR/QR.tsx";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <Routes>
          <Route path="/QR" element={<QR />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
