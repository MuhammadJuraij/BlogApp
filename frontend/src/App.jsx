import React, { useContext } from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import BlogDetail from './pages/BlogDetail/BlogDetail';
import Profile from './pages/Profile/Profile';
import CreateBlog from './pages/CreateBlog/CreateBlog';
import EditProfile from './pages/EditProfile/EditProfile';
import { storeContext } from './Context/StoreContext';

function App() {
  const { token } = useContext(storeContext);

  return (
    <div className='app'>
      <ToastContainer />
      <Router>
        <Routes>
          {/* If token exists, redirect to /home, otherwise show Login page */}
          <Route path='/' element={token ? <Navigate to="/home" /> : <Login />} />
          
          {token ? (
            <>
              <Route path='/home' element={<Home />} />
              <Route path='/blogdetail/:id' element={<BlogDetail />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/createblog' element={<CreateBlog />} />
              <Route path='/edit' element={<EditProfile />} />
            </>
          ) : (
            <Route path='*' element={<Navigate to="/" />} /> // Redirect to login if not authenticated
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
