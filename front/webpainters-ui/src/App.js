import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import GamesPage from './pages/GamesPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/game-selection/:id" element={<GamesPage />} />
          {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/reportBug" element={<ReportBug />} />
          <Route path="/userPage/:id" element={<UserPage />} />
          <Route path="/addProject/:id" element={<AddProject />} />
          <Route path="/myBugs/:id" element={<MyBugs />} />
          <Route path="/TesterPage" element={<TestTable />}/> */}
        </Routes>
  </BrowserRouter>
  );
}

export default App;
