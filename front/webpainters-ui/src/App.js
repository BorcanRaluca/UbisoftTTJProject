import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import GamePage from './pages/GamePage';
import GameReviewPage from './pages/GameReviewPage';


function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route path="/game-selection/:id/:nameCompany" element={<GamePage />} />
          <Route path="/game-selection/:id/game/:idGame" element={<GameReviewPage />} />
         
        </Routes>
  </BrowserRouter>
  );
}

export default App;
