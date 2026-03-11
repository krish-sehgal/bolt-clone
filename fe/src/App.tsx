import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Builder } from './pages/Builder.jsx';
import Login from './pages/Login.js';
import Register from './pages/Register.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import GuestRoute from './components/GuestRoute.js';
// import { Loader } from './components/Loader.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<GuestRoute><Login /></GuestRoute>} />
        <Route path='/register' element={<GuestRoute><Register /></GuestRoute>} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;