import React, { useState, useEffect } from 'react';
import GamesList from './GamesList';
import "./GamePage.css"

function GamesPage() {
        return (    
                <div style={{margin:10, justifyContent:"center"}}>
                    <GamesList/>
                </div>
        );
}

export default GamesPage;