

function gameOver() {
	isGameOver = true;
	setTimeout(function(){
		flipCard();
	}, 1000);
	disableButton(standButton);
	disableButton(hitButton);
	
	if (dealerHandTotal === 21) {
		if (playerHandTotal === 21) {
			gameWinner = "tie";
		} else {
			gameWinner = "dealer";
		}
	} else if (dealerHandTotal > 21) {
		if (playerHandTotal <= 21) {
			gameWinner = "player";
		} else {
			gameWinner = "tie";
		}
	} else if (dealerHandTotal < 21) {
		if (playerHandTotal === 21) {
			gameWinner = "player";
		} else if (playerHandTotal < 21 && playerHandTotal > dealerHandTotal) {
			gameWinner = "player";
		} else if (playerHandTotal < 21 && playerHandTotal === dealerHandTotal) {
			gameWinner = "tie";
		} else {
			gameWinner = "dealer";
		}
	}

	
	$("#game-outcome").css({"font-size":"2em","color": "red"});
	if (gameWinner === "player") {
	   $("#game-outcome").text("You won");
	   if(playerHandTotal === 21){$("#game-outcome").text("BLACKJACK!!! You Won!!");}
	} else if (gameWinner === "dealer") {
		$("#game-outcome").text("Dealer won");
	} else if (gameWinner === "tie") {
		$("#game-outcome").text("You tied");
	}
	updateMainBalance();
	$("#game-outcome").show();
	setTimeout(function(){
		$("#game-board").hide();
		$("#welcome").hide();
		$(startButton).hide();
		$("#game-outcome").hide();

		currentBet = localStorage.getItem('CurrentBet');

		$("#bet-options").appendTo("#new-bet-options");
		$("#new-bet-options").removeClass("inactive");
		$("#bet-options div").addClass("inactive");
		$(".bet-gameplay").addClass("inactive");

		$(playAgain).show();
	}, 4000);
} 


function updateMainBalance() {
	if (gameWinner === "player") {
		if (playerHasAce === true && playerHandTotal === 21 && playerHand.length === 2) {
			currentChipBalance += currentBet*(3/2) + currentBet;
		} else {
			currentChipBalance += currentBet*2;
		}
	} else if (gameWinner === "tie") {
		currentChipBalance += currentBet;		
	}
	//currentBet = 0;
	updateChipBalances();
}

 function newGame() {
	getCards();
	dealerGameBoard.empty();
	playerGameBoard.empty();
	gameWinner = "none";
	dealerHand = [];
	dealerHandTotal = 0;
	dealerStatus = "start";
	playerHand = [];
	playerHandTotal = 0;
	playerStatus = "start";  
	playerHasAce = false;  
	isGameOver = false;
	currentChipBalance = localStorage.getItem('BlackJackChips');

   	enableButton(standButton, stand);
	enableButton(hitButton, hit);
	updateHandTotals();
	updateChipBalances();
	$("#new-bet-options").addClass("inactive");
	$("#game-outcome").hide();
	$(startButton).hide();
	startGame();
}
 
