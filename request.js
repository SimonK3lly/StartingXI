document.getElementById('formation').addEventListener('change', function() {
    var formation = this.value.split('-');
    var defenders = formation[0];
    var midfielders = formation[1];
    var forwards = formation[2];

    var playerInputsDiv = document.getElementById('playerInputs');
    playerInputsDiv.innerHTML = ''; // Clear existing inputs

    // Dynamically create input fields based on formation
    addPlayerInputs(playerInputsDiv, 'Goalkeeper', 1);
    addPlayerInputs(playerInputsDiv, 'Defender', defenders);
    addPlayerInputs(playerInputsDiv, 'Midfielder', midfielders);
    addPlayerInputs(playerInputsDiv, 'Forward', forwards);
});

function addPlayerInputs(div, position, count) {
    for (let i = 1; i <= count; i++) {
        var input = document.createElement('input');
        input.type = 'text';
        input.name = position.toLowerCase() + i;
        input.placeholder = position + ' ' + i;
        div.appendChild(input);
        div.appendChild(document.createElement('br'));
    }
}


// Get references to checkboxes
var homeTeamCheckbox = document.getElementById('homeTeamCheckbox');
var awayTeamCheckbox = document.getElementById('awayTeamCheckbox');

// Ensure only one checkbox can be checked at a time
homeTeamCheckbox.addEventListener('change', function() {
    if (this.checked) {
        awayTeamCheckbox.checked = false;
    }
});

awayTeamCheckbox.addEventListener('change', function() {
    if (this.checked) {
        homeTeamCheckbox.checked = false;
    }
});

// Modified form submission event listener
document.getElementById('matchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Check if at least one checkbox is checked
    if (!homeTeamCheckbox.checked && !awayTeamCheckbox.checked) {
        alert('Please select which team the provided players belong to.');
        return; // Stop the form submission
    }

    // Collect form data
    var matchData = {
        homeTeam: document.getElementById('homeTeam').value,
        awayTeam: document.getElementById('awayTeam').value,
        matchDate: document.getElementById('matchDate').value,
        result: document.getElementById('result').value,
        isHomeTeam: homeTeamCheckbox.checked, // Collect the checkbox state
    };

    // Store data in JSON format and add to table
    var matches = JSON.parse(localStorage.getItem('matches')) || [];
    matches.push(matchData);
    localStorage.setItem('matches', JSON.stringify(matches));

    // Update table with new entry
    updateTable();
});


function updateTable() {
    var matches = JSON.parse(localStorage.getItem('matches')) || [];
    var tableBody = document.querySelector('.request-table-body');
    tableBody.innerHTML = ''; // Clear existing rows in the table

    matches.forEach(function(match, index) {
        var row = tableBody.insertRow(-1); // Append new row at the end

        var homeCell = row.insertCell(0);
        var awayCell = row.insertCell(1);

        // Apply bold styling to the team that was checked
        if (match.isHomeTeam) {
            homeCell.innerHTML = '<u>' + match.homeTeam + '</u>';
            awayCell.textContent = match.awayTeam;
        } else {
            homeCell.textContent = match.homeTeam;
            awayCell.innerHTML = '<u>' + match.awayTeam + '</u>';
        }
        row.insertCell(2).textContent = match.matchDate;
        row.insertCell(3).textContent = match.result;
    });
}

// Call updateTable on page load to display existing matches
document.addEventListener('DOMContentLoaded', updateTable);
