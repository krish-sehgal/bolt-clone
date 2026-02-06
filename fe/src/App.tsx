import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Builder } from './pages/Builder.jsx';
import Login from './pages/Login.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import { useAuth } from './hooks/useAuth.js';
import { Loader } from './components/Loader.js';
// import { parseXml } from './steps';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/builder" element={
          <ProtectedRoute>
            <Builder />
          </ProtectedRoute>
        } />
        <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;