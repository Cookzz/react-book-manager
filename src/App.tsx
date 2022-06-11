import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from './components/NavigationBar';

import Login from './pages/Login'

import BookManager from './pages/BookManager';
import Analytics from './pages/Analytics';
import UserManager from './pages/UserManager';
import BookDetails from './pages/books/BookDetails';

import { selectUser } from './reducers/userSlice'

import { useAppSelector } from './redux/hooks'

const LoginPage = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
)

const Home = () => (
  <>
    <NavigationBar />
    <Routes>
      <Route path="books" element={<BookManager />} />
      <Route path="books/create" element={<BookDetails />} />
      <Route path="analytics" element={<Analytics />} />
      <Route path="users" element={<UserManager />} />
      <Route path="*" element={<Navigate to="/books" replace />} />
    </Routes>
  </>
)

const App = () => {
  const user = useAppSelector(selectUser)

  return (
    <div>
      { user ? 
        <Home /> : 
        <LoginPage />
      }
    </div>
  );
}

export default App;
