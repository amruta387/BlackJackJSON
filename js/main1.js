//MainJavascript code to run and check the conditions

$(document).ready(function() {
    $("#game-rules").click(function(){
        $("#rules").slideToggle("slow");
    });

    $("#rules-close").click(function(){
        $("#rules").slideToggle("slow");
    });

    updateChipBalances();
  
    $(startButton).click(startGame);
    $(hitButton).click(hit);
    $(standButton).click(stand);
    $(playAgain).click(newGame);
    $("#reset-game").click(resetGame);

});

//Globally declared variables
//var cards = new Array();

var startButton = $("#start-game-button");
var hitButton = $("#hit-button");
var standButton = $("#stand-button");
var playAgain = $(".new-game-button");

var currentBet = 0;
var currentChipBalance = 500;
var currentTurn = "player";

var playerHand = [];
var playerHandTotal = 0;
var playerGameBoard = $("#user-hand");
var playerHandTotalDisplay = $(".hand-total");
var playerStatus = "start";

var dealerHand = [];
var dealerGameBoard = $("#dealer");
var dealerHandTotal = 0;
var dealerStatus = "start";

var playerHasAce = false;

var isGameOver = false;
var gameWinner = "";

//EventListeners for Chips

$("#chip10").click(function(){selectBet(10)});
$("#chip25").click(function(){selectBet(25)});
$("#chip50").click(function(){selectBet(50)});
$("#chip100").click(function(){selectBet(100)});
$("#game-outcome").hide();

function selectBet(amount){
    currentBet = amount;
    localStorage.setItem('CurrentBet', currentBet);  // Stores the Selected bet into localstorage
    updateChipBalances();
}

function updateChipBalances(){
    $(".current-bet").text(currentBet);
    $(".current-chip-balance").text(currentChipBalance);
    localStorage.setItem('BlackJackChips', currentChipBalance);   //stores your main balance in localstorage
}

// Read the cards from json file and stores in cards

// function getCards(){
//     var request = createXHR();
//     if(request !== null) {
//         openRequest(request);
//     } else {
//         console.log("No AJAX Possible");
//     }
//     function openRequest(request) {
//         // AJAX-Statements
//         $.ajax({
//             url: "js/deck.json",
//             dataType: "json",        
//             type: "GET",
//             success: (data) => {
//             cards = data;
//            }
//         });
//     }
//  } 



var startGame = function(){
    $(playAgain).hide();
    $(".bet-gameplay").show();
    //check if player has selected a bet.
	if(currentBet === 0){
        alert("You must select a bet to play");
    } else if(currentBet < 10 || currentChipBalance === 0){
        alert("You're out of chips!! Game will be rebooted");
        resetGame();
    }else if(currentBet > currentChipBalance){
        alert("Insufficient chip balance!! Game will be rebooted");
        resetGame();
    }else{
       currentChipBalance -= currentBet;
       updateChipBalances();
       $("#welcome").hide();
       $("#game-board").show();
       getCards();
       for(var i = 0; i <= 1; i++){
          setTimeout(function(){
                currentTurn = "player";
                dealCard(playerHand, playerGameBoard);
                currentTurn = "dealer";
                dealCard(dealerHand, dealerGameBoard);
            },500);
       }
    }
}

//Function used for shuffling a deck

function shuffleCards(array){
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex = currentIndex - 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//function for dealing cards 
  function dealCard(hand, gameBoard){
    shuffleCards(cards);
    var dealtCard = cards.shift();
    hand.push(dealtCard);
    var index = hand.length - 1;

    var cardImage = $("<img>").attr("class", "card").attr("src", "img/" + hand[index].src).hide();  //Display dealt cards
    cardImage.attr("id", currentTurn + "-card-" + index);

    if (index === 0) {
		cardImage.appendTo($(gameBoard)).show();
	} else if (index > 0) {
		cardImage.appendTo($(gameBoard)).offset({left: -60}).css("margin-right", -60).show();	
    }

    //add the values of cards
    if (currentTurn === "player") {
		playerHandTotal += hand[index].value;
	}else if (currentTurn === "dealer") {
		dealerHandTotal += hand[index].value;
    }
    //Checks if player has Ace
    if (hand[index].name === "ace" && currentTurn != "dealer") {
		playerHasAce = true;
	}	
    
    if (dealerHand.length === 2 && currentTurn === "dealer") {
		cardImage.attr("src", "img/card_back.png");
    }
    updateHandTotals();
    gameStatus();
}

function updateHandTotals(){
    $(playerHandTotalDisplay).text(playerHandTotal);
	if (dealerHand.length === 2 && isGameOver === false && dealerStatus === "start") {
		$(".dealer-hand-total").text(dealerHandTotal - dealerHand[1].value);
	} else {
		$(".dealer-hand-total").text(dealerHandTotal);
	}
}

//checks game status
function gameStatus() {
	if (currentTurn != "dealer") {
		if (playerHasAce === true) {
			reviewAces(playerHand, playerHandTotal);  // checks if total is greater than 21, if it is, then change Aces' value.
		} else {
			isPlayerDone();
		}
	}		
	if (currentTurn === "dealer" && dealerStatus === "hit") {
		dealerPlay();
	}
}

function reviewAces(hand, total) {	
	if (total > 21) {
    	if (hand.length > 2) {
			reduceAces(hand);
			isPlayerDone();
		}
	} else {
		isPlayerDone();
	}
}
  
function reduceAces(deck) {
	for (var i = 0; i < deck.length; i++) {  
		if (deck[i].name === "ace" && deck[i].value === 11) { 
			deck[i].value = 1;
			if (currentTurn === "player") {
				playerHandTotal -= 10;
			} 
			updateHandTotals();
			alert("Your ace value changed from 11 to 1");
		}	
	}
}

function isPlayerDone() {
    if(playerHandTotal >= 21){
        gameOver();
    } else if(currentTurn === "player"){
        if(playerHandTotal === 21){
            gameOver();
        } else if(playerHandTotal > 21){
            playerStatus = "stand";
            gameStatus(); 
        }
    }
}

function dealerPlay() {
	flipCard();
	disableButton(standButton);
	disableButton(hitButton);
	// standard blackjack rules check
	if (dealerHandTotal < 17) {
	    dealCard(dealerHand, dealerGameBoard);
	} else if (dealerHandTotal >= 21) {
	 	gameOver();
	} else if (dealerHandTotal >= 17) {
	    dealerStatus = "stand";
		gameOver();
	}
}

function flipCard() {
	if (dealerHand.length === 2) {
		$("#dealer-card-1").addClass("flipped");
	    $("#dealer-card-1").attr("src", "img/" + dealerHand[1].src);
	    updateHandTotals();
	} 
}

// disable and enable button functions
function disableButton(buttonName) {
	$(buttonName).off();
	$(buttonName).addClass("disabled-button");
}

function enableButton(buttonName, event) {
	$(buttonName).click(event);
	$(buttonName).removeClass("disabled-button");
}

var hit = function(){
 currentTurn = "player";
 playerStatus = "hit";
 dealCard(playerHand,playerGameBoard);
}

var stand = function() {
  playerStatus = "stand";
  currentTurn = "dealer";
  dealerStatus = "hit";
  gameStatus();
}

var resetGame = function(){
    currentBet = 0;
	currentChipBalance = 500;
	updateChipBalances();
	location.reload();
}

