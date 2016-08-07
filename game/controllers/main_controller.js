
var gameCanvas;
var gameCanvasContext;
var frameRate = 17;

var score = 0;

var bottles = [
    {
        id: 1,
        positionX: Math.floor(Math.random()*780),
        positionY:0,
        speed: 2, },

    {
        id: 2,
        positionX: Math.floor(Math.random()*780),
        positionY:0,
        speed: 2, }
];

var hero = {
    positionX: 400,
    positionY:760,
    health: 999,
    speed: 0,
    animationSpeed : 17,
}

$(window).load(function(){
    console.log('Welcome to MyGame!');

    console.log(bottles[0]);
    console.log(bottles[1]);

    gameCanvas = document.getElementById('game-canvas');
    gameCanvasContext = gameCanvas.getContext('2d');

    setInterval(function(){
        paintStage();
        paintBottles();
        paintHero();
        moveStage();
        moveHero();
        getPoint()
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
        drawRect(0, 0, gameCanvas.width, gameCanvas.height, 'grey')
}

function moveStage(){

}

function paintBottles() {
    for (var i = 0; i < bottles.length; i++) {
            positionX = bottles[i].positionX;
            positionY = bottles[i].positionY;
         //  setTimeout( function( positionX, positionY ){
                drawRect(positionX, positionY, 20, 35, 'blue');
          //    } , 3000 + Math.random() * 5000, bottles[i].positionX, bottles[i].positionY );
    }
}

bottles.forEach(moveBottle);

function moveBottle(element) {
    console.log(element.id);

    element.positionY = element.positionY + element.speed;

    if(element.positionY > 600) {
       element.speed =  -element.speed;
    }
    else if(element.positionY < 0) {
        element.speed = -element.speed;
    }
}


//Bootles movement function
function moveBottles(arrIndex) {
    bottles[arrIndex].positionY = bottles[arrIndex].positionY + bottles[arrIndex].speed;

    if(bottles[arrIndex].positionY > gameCanvas.height) {
        bottles[arrIndex].speed =  -bottles[arrIndex].speed;
    }
    else if(bottles[arrIndex].positionY < 0) {
        bottles[arrIndex].speed = -bottles[arrIndex].speed;
    }
}


function paintHero(){
    //Elmo
    drawCircle(hero.positionX, gameCanvas.height-40, 25, 'brown');
    drawCircle(hero.positionX-10, gameCanvas.height-40, 9, 'white');
    drawCircle(hero.positionX-10, gameCanvas.height-40, 5, 'black');
    drawCircle(hero.positionX+10, gameCanvas.height-40, 9, 'white');
    drawCircle(hero.positionX+10, gameCanvas.height-40, 5, 'black');
    drawRect(hero.positionX-25, gameCanvas.height - 65, 50, 50, 'rgba(20, 14, 44, 0.3)');
}

function moveHero() {
    moveHeroLeft();
    moveHeroRight();
};

//Hero movement functions
function moveHeroLeft() {
    if (hero.positionX > 0){
        hero.positionX = hero.positionX - hero.speed;
    }
}

function moveHeroRight() {
    if (hero.positionX < gameCanvas.width){
        hero.positionX = hero.positionX + hero.speed;
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

function getPoint(){
    var heroCurrentPosition = hero.positionX - 25 && gameCanvas.height - 6;
    var bottleCurrentPosition = bottles.positionX;

    if (bottles.positionX > hero.positionX - 25 && bottles.positionX < hero.positionX + 25 && bottles.positionY > gameCanvas.height -50) {
        score +=10;
        $('#score').text(score);
        console.log("score: " + score)
    }
}

// Drawing functions
function drawRect(left, top, width, height, drawColor) {
    console.log( left, top );
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.fillRect(left, top, width, height)
}

function drawCircle(left, top, radius, drawColor) {
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(left, top, radius, 0, Math.PI*2, true);
    gameCanvasContext.fill();
}