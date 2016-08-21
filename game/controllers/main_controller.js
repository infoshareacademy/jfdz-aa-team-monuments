var gameCanvas;
var gameCanvasContext;

var frameRate = 8;
var score = 0;

var bottleSpeed = 1;

var bottles = [
    {
        positionX: Math.floor(Math.random()*780),
        positionY:0
    },
    {
        positionX: Math.floor(Math.random()*780),
        positionY:-100
    },
    {
        positionX: Math.floor(Math.random()*780),
        positionY:-200
    },
    {
        positionX: Math.floor(Math.random()*780),
        positionY:-300
    },
];

var hero = {
    positionX: 400,
    positionY:760,
    health: 999,
    speed: 0,
    animationSpeed : 17,
};

$(window).load(function(){
    console.log('Welcome to MyGame!');

    console.log(bottles[0]);
    console.log(bottles[1]);

    gameCanvas = document.getElementById('game-canvas');
    gameCanvasContext = gameCanvas.getContext('2d');

     setInterval(function(){
        gameCanvasContext.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
        paintStage();
        paintBottles();
        paintHero();
        moveHero();
    },frameRate);


    gameCanvas.addEventListener('mousemove' , function(evt){
        var mousePosition = calculateMousePosition(evt);
        hero.positionX = mousePosition.x;
    });

    window.addEventListener('keydown',keydownMove,false);
    window.addEventListener('keyup',keyupMove,false);
});

function paintStage(){
        //Background
        drawRect(0, 0, gameCanvas.width, gameCanvas.height, 'green')
}

//Bootles draw and movement functions
function paintBottles() {

    for (var i = 0; i < bottles.length; i++) {
        var positionX = bottles[i].positionX;
        var positionY = bottles[i].positionY;
        var heroRange = positionX > hero.positionX - 45 && positionX < hero.positionX + 45;

        if (positionY < gameCanvas.height-45) {
            drawRect(positionX, positionY, 20, 35, 'blue');
            moveBottle(i);

            if (positionY == gameCanvas.height -46 && heroRange) {
                score +=10;
                $('#score').text(score);
                console.log("score: " + score);
            }

            else if (positionY == gameCanvas.height-46 && !heroRange) {
                hero.health -= 10;
                $('#health').text(hero.health);
                console.log("Hero health: " + hero.health);
            }
        }
    }
}

function moveBottle(elem) {
    bottles[elem].positionY += bottleSpeed;
}

function paintHero(){
    //Elmo
    drawCircle(hero.positionX, gameCanvas.height-50, 40, 'brown');
    drawCircle(hero.positionX-15, gameCanvas.height-45, 13, 'white');
    drawCircle(hero.positionX-15, gameCanvas.height-45, 5, 'black');
    drawCircle(hero.positionX+15, gameCanvas.height-45, 13, 'white');
    drawCircle(hero.positionX+15, gameCanvas.height-45, 5, 'black');
}

function moveHero() {
    moveHeroLeft();
    moveHeroRight();
};

//Hero movement functions
function moveHeroLeft() {
    if (hero.positionX > 0){
        hero.positionX -= hero.speed;
    }
}
function moveHeroRight() {
    if (hero.positionX < gameCanvas.width){
        hero.positionX += hero.speed;
    }
}

//Keyboard controls function
var moveHeroInterval;

function keydownMove(key) {
    if( !moveHeroInterval ) {
        hero.speed = 10;
        if (key.keyCode == 65) {
            moveHeroInterval = setInterval(moveHeroLeft, hero.animationSpeed);
        }

        if (key.keyCode == 68) {
            moveHeroInterval = setInterval(moveHeroRight, hero.animationSpeed);
        }
    }
}

function keyupMove(){
    clearInterval(moveHeroInterval);
    moveHeroInterval = null;
    hero.speed = 0;
}

//Mouse control function
function calculateMousePosition(evt) {
    var rect = gameCanvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

// Drawing functions
function drawRect(left, top, width, height, drawColor) {
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.fillRect(left, top, width, height)
}

function drawCircle(left, top, radius, drawColor) {
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(left, top, radius, 0, Math.PI*2, true);
    gameCanvasContext.fill();
}

