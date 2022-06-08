import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";

import NavigationBar from './components/NavigationBar';

import BookManager from './pages/BookManager';
import Analytics from './pages/Analytics';
import UserManager from './pages/UserManager';

const App = () => {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="books" element={<BookManager />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<UserManager />} />
        <Route path="*" element={<Navigate to="/books" replace />} />
      </Routes>
    </div>
  );
}

export default App;
