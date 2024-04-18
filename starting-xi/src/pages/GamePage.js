import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import GuessModal from './GuessModal';
import matchesData from './matchesData.json'; // You should have this JSON in your src folder
import './styles.css';

const GamePage = () => {
  const [currentMatch, setCurrentMatch] = useState(matchesData.matches[2]); // Example match
  const [showModal, setShowModal] = useState(false);
  const [playerToGuess, setPlayerToGuess] = useState('');

  useEffect(() => {
    // Setup function or effect if needed
  }, []);

  const openGuessModal = (playerName) => {
    setPlayerToGuess(playerName);
    setShowModal(true);
  };

  return (
    <div id="main-content">
      <Header />
      <Sidebar />
      <div className="team-info">
        {/* ... */}
      </div>
      <div className="pitch">
        {/* You will map through currentMatch players and create elements */}
        {currentMatch.players.goalkeeper.map((playerName) => (
          // Example for goalkeeper, repeat for other positions
          <div className="goalkeeper players-row" onClick={() => openGuessModal(playerName)}>
            {/* Display player with masking, e.g., '***' */}
            {playerName.replace(/./g, '*')}
          </div>
        ))}
        {/* Repeat for defenders, midfielders, attackers */}
      </div>
      {showModal && <GuessModal playerName={playerToGuess} onClose={() => setShowModal(false)} />}
      <Footer />
    </div>
  );
};

export default GamePage;
