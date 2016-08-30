var elementsProperties = {
    frames: 8,
    bottles: {
        list: [],
        speed: 1
    },
    hero: {
        positionX: 400,
        positionY:750,
        health: 50,
        speed: 0,
        animationSpeed : 17
    },
    player: {
        bestScore: 0,
        score: 0
    }
};

var bottlesList = elementsProperties.bottles.list;
var bottlesSpeed = elementsProperties.bottles.speed;

var hero = elementsProperties.hero;
var player = elementsProperties.player;
var gameInterval;

$( document ).ready(function() {
    console.log( "Ekran powitalny - Let's play some game!" );
    openingScreen();
});

// --------- TITLE -----------
function openingScreen() {
    clearInterval(gameInterval);
    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#D13208');
    drawImageElement('images/beers.png', 340, 130, 125, 125);
    drawText('AA Team', '40px Impact, Charcoal, sans-serif', '#E9AD0E', 'right', 335, (gameCanvas.height/2));

    $('#restart-btn').click(restartGameButton);
    $('#start-btn').click(startGameButton);
    $('#end-btn').click(endGameButton);
}

// --------- GAME -----------
function startGame() {
    console.log('Ekran Rozgrywki - Real game starts here!');

    addBottles(5);
    clearInterval(gameInterval);

    gameInterval = setInterval(function(){
        gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        paintStage();
        paintBottles();
        paintHero();
        moveHero();
    },elementsProperties.frames);

    gameCanvas.addEventListener('mousemove' , function(evt){
        var mousePosition = calculateMousePosition(evt);
        hero.positionX = mousePosition.x;
    });

    window.addEventListener('keydown',keydownMove,false);
    window.addEventListener('keyup',keyupMove,false);
}

// --------- GAME OVER -----------
function endGame(){
    console.log('Ekran końcowy - Game Over');

    clearInterval(gameInterval);

    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#D13208');
    drawText('Game Over', '40px Impact, Charcoal, sans-serif', '#E9AD0E', 'center', 320, gameCanvas.height/2);
}

// --------- TITLE -----------
function paintStage(){
    //Background
    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#90C3D4');
    drawRect(0, gameCanvas.height-45, gameCanvas.width, 45, '#4AA840');
}


// --------- Functions -----------

//Bootles draw and movement functions
function addBottles(number) {
    bottlesList =[];
    for (var i = 0; i<number; i++) {

        bottlesList.push({
            positionX: Math.floor(Math.random()*780),
            positionY: i * -100
        });
    }
}

function paintBottles() {
    bottlesList.forEach(dropBottle);

    function dropBottle(item,index) {
        if (item === undefined) {
            return;
        }

        var bottlePositionX = bottlesList[index].positionX;
        var bottlePositionY = bottlesList[index].positionY;
        var heroRange = bottlePositionX > hero.positionX - 50 && bottlePositionX < hero.positionX + 50;

        drawRect(bottlePositionX, bottlePositionY, 20, 35, 'blue');
        moveBottle(index);

        if (bottlePositionY >= gameCanvas.height -60 && heroRange) {
            player.score +=10;
            $('#score').text(player.score);
            console.log("score: " + player.score);
            bottlesList[index] = undefined;
        }

        else if (bottlePositionY > gameCanvas.height-50 && !heroRange) {
            hero.health -= 10;
            $('#health').text(hero.health);
            console.log("Hero health: " + hero.health);
            bottlesList[index] = undefined;

            if (hero.health == 0) {
                console.log('You died');
                return endGameButton();
            }
        }
    }
    if(bottlesList.every(isUndefined)) {
        return endGameButton()
    }
}

function moveBottle(elem) {
    bottlesList[elem].positionY += bottlesSpeed;
}

function paintHero(){
    //Elmo
    drawCircle(hero.positionX, gameCanvas.height-60, 45, 'brown');
    drawCircle(hero.positionX-15, gameCanvas.height-55, 13, 'white');
    drawCircle(hero.positionX-15, gameCanvas.height-55, 5, 'black');
    drawCircle(hero.positionX+15, gameCanvas.height-55, 13, 'white');
    drawCircle(hero.positionX+15, gameCanvas.height-55, 5, 'black');
}

function moveHero() {
    moveHeroLeft();
    moveHeroRight();
}

function startGameButton(){
    clearPlayerParameters();
    startGame();
}

function restartGameButton(){
    clearPlayerParameters();
    openingScreen();
}

function endGameButton(){
    endGame();
    showBestScore();
    clearPlayerParameters();
}

function clearPlayerParameters() {
    hero.positionX = 400;

    $('#score').text(player.score);
    $('#health').text(hero.health);

    hero.health = 50;
    player.score = 0;
}

function showBestScore() {
    if (player.score - player.bestScore > 0) {
        player.bestScore = player.score;
    }

    console.log('Your score is: ' + player.score);
    console.log('Your best score is: ' + player.bestScore);
}