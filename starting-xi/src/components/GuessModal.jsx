import React, { useState } from 'react';
import './styles.css';

const GuessModal = ({ playerName, onClose }) => {
  const [guess, setGuess] = useState('');
  // ... additional states and logic for handling the guesses

  const submitGuess = () => {
    // Logic to validate and handle the guess
    // Call onClose when guess is correct or out of attempts
    if (isCorrectGuess) {
      onClose();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Guess the player:</p>
        <div className="guessSquares">
          {/* ... Render squares based on the guess */}
        </div>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value.toUpperCase())}
          onKeyPress={(e) => e.key === 'Enter' && submitGuess()}
        />
        <button onClick={submitGuess}>Enter</button>
      </div>
    </div>
  );
};

export default GuessModal;
