// // Select all boxes and reset button
// let Boxes = document.querySelectorAll(".Box");
// let ResetBtn = document.querySelector("#GameResetBtn");

// // Track turn: true = O's turn, false = X's turn
// let turnO = true;

// // Score tracking variables
// let scoreX = 0;
// let scoreO = 0;
// let scoreDraw = 0;

// // Score display elements
// const scoreXDisplay = document.getElementById("scoreX");
// const scoreODisplay = document.getElementById("scoreO");
// const scoreDrawDisplay = document.getElementById("scoreDraw");

// // Popup elements
// let popup = document.getElementById("popup");
// let popupMessage = document.getElementById("popup-message");
// let popupClose = document.getElementById("popup-close");

// // Winning patterns
// const winPatterns = [
//     [0, 1, 2],
//     [0, 3, 6],
//     [0, 4, 8],
//     [1, 4, 7],
//     [2, 5, 8],
//     [2, 4, 6],
//     [3, 4, 5],
//     [6, 7, 8]
// ];

// // Function to show popup and update score
// const showPopup = (message, winner = null) => {
//     popupMessage.innerText = message;
//     popup.classList.remove("hidden");
//     document.body.classList.add("popup-active");

//     // Update scoreboard
//     if (winner === "X") {
//         scoreX++;
//         scoreXDisplay.innerText = scoreX;
//     } else if (winner === "O") {
//         scoreO++;
//         scoreODisplay.innerText = scoreO;
//     } else if (winner === "draw") {
//         scoreDraw++;
//         scoreDrawDisplay.innerText = scoreDraw;
//     }
// };

// // Disable all boxes when game ends
// const disableAllBoxes = () => {
//     Boxes.forEach((box) => {
//         box.disabled = true;
//     });
// };

// // Reset game board (not scores)
// const resetGame = () => {
//     turnO = true;
//     Boxes.forEach((box) => {
//         box.innerText = "";
//         box.disabled = false;
//         box.style.color = "black";
//     });
//     popup.classList.add("hidden");
//     document.body.classList.remove("popup-active");
// };

// // Check winner or draw
// const CheckWinner = () => {
//     for (let Pattern of winPatterns) {
//         let Pos1Val = Boxes[Pattern[0]].innerText;
//         let Pos2Val = Boxes[Pattern[1]].innerText;
//         let Pos3Val = Boxes[Pattern[2]].innerText;

//         if (Pos1Val !== "" && Pos2Val !== "" && Pos3Val !== "") {
//             if (Pos1Val === Pos2Val && Pos2Val === Pos3Val) {
//                 showPopup(`🎉 Player ${Pos1Val} wins!`, Pos1Val);
//                 disableAllBoxes();
//                 return;
//             }
//         }
//     }

//     // Draw check
//     let allFilled = true;
//     Boxes.forEach((box) => {
//         if (box.innerText === "") {
//             allFilled = false;
//         }
//     });

//     if (allFilled) {
//         showPopup("🤝 It's a draw!", "draw");
//     }
// };

// // Handle box clicks
// Boxes.forEach((box) => {
//     box.addEventListener("click", () => {
//         if (turnO) {
//             box.innerText = "O";
//             box.style.color = "red";
//             turnO = false;
//         } else {
//             box.innerText = "X";
//             box.style.color = "green";
//             turnO = true;
//         }
//         box.disabled = true;
//         CheckWinner();
//     });
// });

// // Reset game button
// ResetBtn.addEventListener("click", resetGame);

// // Close popup button
// popupClose.addEventListener("click", () => {
//     resetGame();
//     popup.classList.add("hidden");
//     document.body.classList.remove("popup-active");
// });



// 🎮 DOM Elements Selection

// Game boxes
let Boxes = document.querySelectorAll(".Box");

// Reset button
let ResetBtn = document.querySelector("#GameResetBtn");

// Score display elements
const scoreXDisplay = document.getElementById("scoreX");
const scoreODisplay = document.getElementById("scoreO");
const scoreDrawDisplay = document.getElementById("scoreDraw");

// Popup elements
let popup = document.getElementById("popup");
let popupMessage = document.getElementById("popup-message");
let popupClose = document.getElementById("popup-close");

// Intro popup elements (name input)
let introPopup = document.getElementById("intro-popup");
let startGameBtn = document.getElementById("startGameBtn");
let playerXNameInput = document.getElementById("playerXName");
let playerONameInput = document.getElementById("playerOName");

// Player name display on scoreboard
let playerXDisplay = document.getElementById("playerXDisplay");
let playerODisplay = document.getElementById("playerODisplay");

// Blue dots indicating starter
let dotX = document.getElementById("dotX");
let dotO = document.getElementById("dotO");


// 🧠 Game State Variables

// Track whose turn it is: true = O's turn, false = X's turn
let turnO = true;

// Track who should start the current round
let currentStarter = "X";

// Player names
let playerXName = "";
let playerOName = "";

// Score counters
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;


// 🧩 Winning Patterns
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


// 🚀 Handle Start Game from Intro Popup
startGameBtn.addEventListener("click", () => {
    const nameX = playerXNameInput.value.trim();
    const nameO = playerONameInput.value.trim();
    const errorMsg = document.getElementById("nameErrorMsg");

    // Clear previous error message
    errorMsg.style.display = "none";
    errorMsg.innerText = "";

    if (!nameX || !nameO) {
        // Show error message in bold red
        errorMsg.innerText = "Please enter both names";
        errorMsg.style.display = "block";
        return; // Stop starting the game
    }

    // Assign names
    playerXName = nameX;
    playerOName = nameO;

    // Display names on scoreboard
    playerXDisplay.innerText = playerXName;
    playerODisplay.innerText = playerOName;

    // Hide intro popup and start game
    introPopup.style.display = "none";
    startNewRound();
});



// 🌀 Start a New Round
const startNewRound = () => {
    // Set turn based on current starter
    turnO = currentStarter === "O";

    // Highlight starting player
    updateStartingPlayerDot();
};


// 🔵 Update Dot Under Starter
const updateStartingPlayerDot = () => {
    dotX.style.visibility = currentStarter === "X" ? "visible" : "hidden";
    dotO.style.visibility = currentStarter === "O" ? "visible" : "hidden";
};


// 🧼 Reset Game Board (not scores)
const resetGame = () => {
    // Clear board
    Boxes.forEach((box) => {
        box.innerText = "";
        box.disabled = false;
        box.style.color = "black";
    });

    // Hide win popup
    popup.classList.add("hidden");
    document.body.classList.remove("popup-active");

    // Alternate the starter for the next round
    currentStarter = currentStarter === "X" ? "O" : "X";

    // Start new round
    startNewRound();
};


// 🚫 Disable All Boxes (when game ends)
const disableAllBoxes = () => {
    Boxes.forEach((box) => {
        box.disabled = true;
    });
};


// 🪧 Show Popup with Message + Update Scoreboard
const showPopup = (message, winner = null) => {
    // If winner is X or O, use their actual name in the message
    if (winner === "X") {
        message = `🎉 ${playerXName} wins!`;
        scoreX++;
        scoreXDisplay.innerText = scoreX;
    } else if (winner === "O") {
        message = `🎉 ${playerOName} wins!`;
        scoreO++;
        scoreODisplay.innerText = scoreO;
    } else if (winner === "draw") {
        message = "🤝 It's a draw!";
        scoreDraw++;
        scoreDrawDisplay.innerText = scoreDraw;
    }

    popupMessage.innerText = message;
    popup.classList.remove("hidden");
    document.body.classList.add("popup-active");
};


// 🏁 Check for Win or Draw
const CheckWinner = () => {
    for (let pattern of winPatterns) {
        let Pos1Val = Boxes[pattern[0]].innerText;
        let Pos2Val = Boxes[pattern[1]].innerText;
        let Pos3Val = Boxes[pattern[2]].innerText;

        // Check if a winning pattern is filled
        if (Pos1Val && Pos1Val === Pos2Val && Pos2Val === Pos3Val) {
            showPopup("", Pos1Val);
            disableAllBoxes();
            return;
        }
    }

    // Check for draw
    let allFilled = true;
    Boxes.forEach((box) => {
        if (box.innerText === "") {
            allFilled = false;
        }
    });

    if (allFilled) {
        showPopup("🤝 It's a draw!", "draw");
    }
};


// 🖱️ Handle Box Clicks
Boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Mark the box and switch turns
        if (turnO) {
            box.innerText = "O";
            box.style.color = "red";
            turnO = false;
        } else {
            box.innerText = "X";
            box.style.color = "green";
            turnO = true;
        }

        box.disabled = true;

        // Check for win/draw
        CheckWinner();
    });
});


// 🔁 Reset Button Click
ResetBtn.addEventListener("click", resetGame);


// ❌ Close Win Popup
popupClose.addEventListener("click", () => {
    resetGame();
    popup.classList.add("hidden");
    document.body.classList.remove("popup-active");
});

  document.getElementById('GameInfo').addEventListener('click', () => {
    window.location.href = 'GameInfo.html'; // update filename here
  });


// window.addEventListener('pageshow', (event) => {
//   const introPopup = document.getElementById('intro-popup');
//   const hasVisited = sessionStorage.getItem('hasVisited');

//   if (event.persisted) {
//     // Page loaded from back/forward cache
//     if (hasVisited) {
//       introPopup.style.display = 'none';
//     } else {
//       introPopup.style.display = 'block';
//     }
//   } else {
//     // Normal load or refresh — always show popup
//     introPopup.style.display = 'block';
//     sessionStorage.removeItem('hasVisited'); // reset flag so popup shows on refresh
//   }
// });

// document.getElementById('startGameBtn').addEventListener('click', () => {
//   const playerX = document.getElementById('playerXName').value.trim();
//   const playerO = document.getElementById('playerOName').value.trim();
//   const errorMsg = document.getElementById('nameErrorMsg');

//   if (!playerX || !playerO) {
//     errorMsg.style.display = 'block';
//     errorMsg.textContent = 'Please enter names for both players.';
//     return;
//   }

//   document.getElementById('intro-popup').style.display = 'none';
//   sessionStorage.setItem('hasVisited', 'true');
// });
