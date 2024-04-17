// Load the team from matches.json
document.addEventListener('DOMContentLoaded', function() {
    // fetch('matches.json')
    // .then(response => response.json())
    // .then(data => {
    //     updateUI(data.matches[2]); // Choose the first match in matches.json
    // })
    // .catch(error => console.error('Error loading the matches data:', error));



    // Unable to fetch from a localfile without using a liveserver so just for the assignment submission I have saved the .json data directly in the matchesData variable in this javascript file.
    updateUI(matchesData.matches[2]);
});

  
// Define the function for handling Enter keypress for showPlayerGuessModal
function handleEnterKeyPress(e) {
    if (e.key === 'Enter') {
        e.preventDefault(); // Prevent form submission if inside a form
        submitGuess();
    }
}


function showPlayerGuessModal(playerName) {

    var modal = document.getElementById('playerModal');
    var guessSquares = document.getElementById('guessSquares');
    var guessInput = document.getElementById('guessInput');
    guessSquares.innerHTML = ''; // Clear previous squares


    var formattedPlayerName = playerName.replace(/\s+/g, '').toUpperCase(); // Convert to uppercase here
    //  inputField is initialized
    var inputField = document.getElementById('playerGuessInput');
    if (!inputField) {
        inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'playerGuessInput';
        inputField.autocomplete = 'off';
        guessInput.appendChild(inputField);
    } else {
        // If inputField already exists, remove the previous event listener to prevent duplicates
        inputField.removeEventListener('keypress', handleEnterKeyPress);
    }
    inputField.value = '';
    inputField.setAttribute('maxlength', formattedPlayerName.length);
    inputField.setAttribute('data-player-name', formattedPlayerName);
    inputField.addEventListener('keypress', handleEnterKeyPress);



    // Create 5 rows of squares for to represent 5 guesses
    for (let guessNum = 0; guessNum < 5; guessNum++) {
        var row = document.createElement('div');
        row.classList.add('guess-row');
        row.setAttribute('data-guess-number', guessNum);
        for (let i = 0; i < formattedPlayerName.length; i++) {
            var square = document.createElement('div');
            square.classList.add('guess-square');
            square.setAttribute('data-index', i);
            square.style.display = 'inline-block';
            square.style.width = '30px';
            square.style.height = '30px';
            square.style.margin = '5px';
            square.style.backgroundColor = '#ccc'; // Grey background 
            square.style.textAlign = 'center';
            square.style.verticalAlign = 'middle';
            square.style.lineHeight = '30px';
            row.appendChild(square);
        }
        guessSquares.appendChild(row);
    }

    modal.style.display = "block";
    inputField.focus(); // Focus on the input field (no need for user to click the text input field, they can start typing right away)
}
  

function submitGuess(){
    var inputField = document.getElementById('playerGuessInput');
    var currentGuessInput = inputField.value.toUpperCase();
    var playerNameFormatted = inputField.getAttribute('data-player-name').toUpperCase();


    // Alert user if the input is too short
    if (currentGuessInput.length !== playerNameFormatted.length) {
        alert("Your guess must match the number of letters in the player's name.");
        return;
    }

    // Find the first row with an unused guess
    var unusedRow = document.querySelector('.guess-row:not(.used)');
    if (!unusedRow) return; // No more guesses available

    var squares = unusedRow.querySelectorAll('.guess-square');
    let isFullyCorrect = true; // Assume the guess is fully correct initially

    // Create arrays to keep track of correct and present letters
    let correctLetters = new Array(playerNameFormatted.length).fill(false);
    let presentLetters = playerNameFormatted.split('').map(letter => ({
        letter: letter,
        count: (currentGuessInput.match(new RegExp(letter, "g")) || []).length
    }));

    // First pass: mark correct letters (green)
    squares.forEach((square, index) => {
        var letterGuessed = currentGuessInput[index];
        square.textContent = letterGuessed;
        if (playerNameFormatted[index] === letterGuessed) {
            square.style.backgroundColor = 'green';
            correctLetters[index] = true;
            presentLetters[index].count--;
        }
    });

    // Second pass: mark present but incorrectly positioned letters (yellow)
    squares.forEach((square, index) => {
        var letterGuessed = currentGuessInput[index];
        if (!correctLetters[index] && presentLetters.some(l => l.letter === letterGuessed && l.count > 0)) {
            square.style.backgroundColor = 'yellow';
            let presentIndex = presentLetters.findIndex(l => l.letter === letterGuessed);
            presentLetters[presentIndex].count--;
        } else if (!correctLetters[index]) {
            // Letter not in player's name
            square.style.backgroundColor = '#ccc'; // Keep gray
        }
    });

     // Check if all squares are green (fully correct)
     squares.forEach((square) => {
        if (square.style.backgroundColor !== 'green') {
            isFullyCorrect = false; // If any square is not green, guess is not fully correct
        }
    });

    if (isFullyCorrect) {
        
        // If the guess is fully correct, set a timeout to close the modal after 1 second
        setTimeout(function() {
            document.getElementById('playerModal').style.display = "none";
        }, 1000);
    }

    unusedRow.classList.add('used'); // Mark this guess row as used
    document.getElementById('playerGuessInput').value = ''; // Clear input for next guess
}
// Call the submitGuess() function when the button with submitGuess id is clicked
document.getElementById('submitGuess').addEventListener('click', submitGuess);


  
// Close the modal when the user clicks on x
document.querySelector('.close').onclick = function() {
   document.getElementById('playerModal').style.display = "none";
}
  


// Update the pitch using info from chosen match
function updateUI(match) {
    // Update team info and result
    let homeTeamName = match.homeTeam;
    let awayTeamName = match.awayTeam;

    // Highlight the team that is being guessed in bold
    if (match.isHome) {
        homeTeamName = `<b>${match.homeTeam}</b>`;
    } else {
        awayTeamName = `<b>${match.awayTeam}</b>`;
    }

    document.querySelector('.team-info .match').innerHTML = `${homeTeamName} vs ${awayTeamName} - ${match.matchDate}`;
    document.querySelector('.team-info .result').textContent = match.result;

    // Clear existing players
    document.querySelectorAll('.players-row').forEach(row => row.innerHTML = '');

    // Helper function to create player elements
    const createPlayerElement = (playerName, position) => {
        const playerContainer = document.createElement('div'); // Container for the player icon and asterisks
        playerContainer.classList.add('player-container');

        // Create Player Element
        const playerElement = document.createElement('a');
        playerElement.href = "#";
        playerElement.classList.add('player');
        playerElement.id = position.toLowerCase();
        const nameLengthExcludingSpaces = playerName.replace(/\s+/g, '').length;  // Remove all spaces from playerName before getting its length
        playerElement.textContent = nameLengthExcludingSpaces;
        playerElement.setAttribute('data-name', playerName); // Store player name for guessing game
  
        // Create Asterisk Element
        const playerNameAsterisks = document.createElement('div'); // Element for asterisks
        playerNameAsterisks.classList.add('player-name-asterisks');
        playerNameAsterisks.textContent = '*'.repeat(playerName.replace(/\s+/g, '').length); // Asterisks for each letter
    
        // Combine the player element and asterisk element in one container.
        playerContainer.appendChild(playerElement);
        playerContainer.appendChild(playerNameAsterisks); // Append the asterisks below the player element
    
        return playerContainer;
    };

    // Add players to the pitch
    ['goalkeeper', 'defenders', 'midfielders', 'attackers'].forEach(position => {
        const container = document.querySelector(`.${position}`);
        match.players[position].forEach(playerName => {
            container.appendChild(createPlayerElement(playerName, position));
        });
    });

    // Add event listeners to each player to trigger the modal
    setupGuessingGame();
}


// setup function to add click event listeners to each player element
function setupGuessingGame() {
    document.querySelectorAll('.player').forEach(player => {
        player.addEventListener('click', function() {
            const playerName = this.getAttribute('data-name').replace(/\s+/g, ''); // Fetch names dynamically, spaces removed to make guessing simpler
            console.log(playerName) // Shows correct answer in console for testing purposes to easily see the expected answer
            showPlayerGuessModal(playerName); // Call modal function
        });
    });
}




// JSON Match Data
var matchesData = {
    "matches": [
      {
        "homeTeam": "Manchester United",
        "awayTeam": "Tottenham",
        "isHome": true,
        "matchDate": "28/10/2017",
        "result": "1-0",
        "formation": "4-3-3",
        "players": {
          "goalkeeper": ["De Gea"],
          "defenders": ["Valencia", "Smalling", "Jones", "Young"],
          "midfielders": ["Matic", "Herrera", "Pogba"],
          "attackers": ["Rashford", "Lukaku", "Martial"]
        }
      },
      {
        "homeTeam": "Chelsea",
        "awayTeam": "Liverpool",
        "isHome": false,
        "matchDate": "03/03/2018",
        "result": "2-1",
        "formation": "4-3-3",
        "players": {
          "goalkeeper": ["Alisson"],
          "defenders": ["Arnold", "Gomez", "Van Dijk", "Robertson"],
          "midfielders": ["Fabinho", "Wijnaldum", "Henderson"],
          "attackers": ["Salah", "Firmino", "Mané"]
        }
      },
      {
        "homeTeam": "Arsenal",
        "awayTeam": "Manchester City",
        "isHome": true,
        "matchDate": "12/08/2018",
        "result": "0-3",
        "formation": "3-4-3",
        "players": {
          "goalkeeper": ["Leno"],
          "defenders": ["Bellerin", "Luiz", "Tierney"],
          "midfielders": ["Xhaka", "Ceballos", "Pepe", "Saka"],
          "attackers": ["Willian", "Lacazette", "Aubameyang"]
        }
      }
    ]
  }
  