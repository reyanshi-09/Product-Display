// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPage';
import QRScanner from './pages/QRScanner';
import ShowQRData from './pages/QRDisplay'; // optional: screen that shows scanned data
import EzyChargeStation from './pages/EzyChargeStation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/scanner" element={<QRScanner />} />
        <Route path="/show" element={<ShowQRData />} /> {/* optional */}
        <Route path="/station" element={<EzyChargeStation />} /> {/* ✅ added */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
