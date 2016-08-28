var elementsProperties = {
    frames: 8,
    bottles: {
        number: [],
        speed: 1
    },
    hero: {
        positionX: 400,
        positionY:750,
        health: 999,
        speed: 0,
        animationSpeed : 17
    },
    player: {
        score: 0,
        health: 100
    }
};

var bottlesNumber = elementsProperties.bottles.number;
var bottlesSpeed = elementsProperties.bottles.speed;

var hero = elementsProperties.hero;
var player = elementsProperties.player;
var gameInterval;


$( document ).ready(function() {

    console.log( "Ekran powitalny - Let's play some game!" );

    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#D13208');
    drawImageElement('images/beers.png',340,130, 150, 150);
    drawText('AA Team', '45px Impact, Charcoal, sans-serif', '#E9AD0E', 'center' , 325, 340 );

    $('#restart-btn').click(startGame);
    $('#start-btn').click(startGame);

});

function startGame() {

    console.log('Ekran Rozgrywki - Real game starts here!');

    addBottles(10);

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
    };


function endGame(){
    console.log('Ekran końcowy - Game Over')
};


function paintStage(){
    //Background
    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#90C3D4');
    drawRect(0, gameCanvas.height-45, gameCanvas.width, 45, '#4AA840');
}


//Bootles draw and movement functions
function addBottles(number) {
    bottlesNumber =[];
    for (var i = 0; i<number; i++) {
        bottlesNumber.push({
            positionX: Math.floor(Math.random()*780),
            positionY: i * -100
        });
    }
}

function paintBottles() {

    bottlesNumber.forEach(myFunction);

    function myFunction(item,index) {
        if (item === undefined) {
            return;
        }

        var bottlePositionX = bottlesNumber[index].positionX;
        var bottlePositionY = bottlesNumber[index].positionY;
        var heroRange = bottlePositionX > hero.positionX - 50 && bottlePositionX < hero.positionX + 50;
        
        drawRect(bottlePositionX, bottlePositionY, 20, 35, 'blue');
        moveBottle(index);

        if (bottlePositionY >= gameCanvas.height -50 && heroRange) {
            player.score +=10;
            $('#score').text(player.score);
            console.log("score: " + player.score);
            bottlesNumber[index] = undefined;
        }

        else if (bottlePositionY >= gameCanvas.height-50 && !heroRange) {
            player.health -= 10;
            $('#health').text(player.health);
            console.log("Hero health: " + player.health);
            bottlesNumber[index] = undefined;
        }
    }
}

function moveBottle(elem) {
    bottlesNumber[elem].positionY += bottlesSpeed;
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