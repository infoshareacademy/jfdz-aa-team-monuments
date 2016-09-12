var elementsProperties = {
    frames: 12,
    bottles: {
        list: [],
        speed: 1,
        amount: 5
    },
    hero: {
        positionX: 400,
        positionY:750,
        health: 50,
        healthDefault: 50,
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
var bottlesAmount = elementsProperties.bottles.amount;

var hero = elementsProperties.hero;
var player = elementsProperties.player;
var gameInterval;

$( document ).ready(function() {
    console.log( "Ekran powitalny - Let's play some game!" );
    openingScreen();
});


// --------- TITLE -----------
function openingScreen() {
    console.log('Start-Screen');
    clearInterval(gameInterval);
    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#D13208');

    $('#restart-btn').click(restartGameButton);
    $('#start-btn').click(startGameButton);
    $('#end-btn').click(endGameButton);
}

// --------- GAME -----------

function hideStartScreen() {
        $(".start").removeClass();
}

function startGame() {
    console.log('Ekran Rozgrywki - Real game starts here!');

    addBottles(bottlesAmount);
    clearInterval(gameInterval);

    addInterval();

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
}

function showEndScreen() {
    $("#end").addClass("end");
}

function restartScreen() {
    $("#end").removeClass("end");
    $('#start').addClass('start');
}

// -------------------
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

function addInterval() {
    gameInterval = setInterval(function(){
        gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        paintStage();
        paintBottles();
        paintHero();
        moveHero();
    },elementsProperties.frames);
}

var maxLevels = 5,
    level = 1;

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
                console.log(1);
                return endGameButton();
            }
        }
    }

    if(bottlesList.every(isUndefined)) {
        clearInterval(gameInterval)
        setTimeout(function() {
            bottlesAmount += 5;
            addBottles(bottlesAmount);
            level++;
            addInterval();

            end();
            console.log(level);
        }, 2000);

        function end() {
            if (level === maxLevels) {
                return endGameButton()
            }a
        }
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
    hideStartScreen();
}

function restartGameButton(){
    clearPlayerParameters();
    openingScreen();
    restartScreen();
}

function endGameButton(){
    endGame();
    showBestScore();
    clearPlayerParameters();
    showEndScreen();
}

function clearPlayerParameters() {
    hero.positionX = 400;

    $('#score').text(player.score);
    $('#health').text(hero.health);

    hero.health = hero.healthDefault;
    player.score = 0;
}

function showBestScore() {
    if (player.score - player.bestScore > 0) {
        player.bestScore = player.score;
    }

    console.log('Your score is: ' + player.score);
    console.log('Your best score is: ' + player.bestScore);

}

