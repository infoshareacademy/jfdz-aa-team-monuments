
var gameCanvas;
var gameCanvasContext;

var botlePositionX = 390;
var botlePositionY = 0;
var botleSpeed = 2;

var heroPositionX = 400;
var heroSpeed = 5;
var heroPositionY = 760;


$(window).load(function(){
    console.log('Welcome to MyGame!');

    gameCanvas = document.getElementById('game-canvas');
    gameCanvasContext = gameCanvas.getContext('2d');

    // function draw() {
    //     paintStage();
    //     moveStage();
    //     paintStage();
    //     moveStage();
    //     paintHero();
    //     moveHero();
    //     requestAnimationFrame(draw);
    // }
    // draw();

    setInterval(function(){
        paintStage();
        paintHero();
        moveStage();
        moveHero();
    },10);
    

    gameCanvas.addEventListener('mousemove' , function(evt){
        var mousePosition = calculateMousePosition(evt);
        heroPositionX = mousePosition.x;
    });

    window.addEventListener('keydown',keydownMove,false);
});


function paintStage(){
    //Background
    drawRect(0, 0, gameCanvas.width, gameCanvas.height, 'grey');

    //Bootle
    drawRect(botlePositionX, botlePositionY, 20, 35, 'blue');
}

function moveStage(){
    moveBootle();
}

function paintHero(){
    //Elmo
    drawCircle(heroPositionX, gameCanvas.height-40, 25, 'brown');
    drawCircle(heroPositionX-10, gameCanvas.height-40, 9, 'white');
    drawCircle(heroPositionX-10, gameCanvas.height-40, 5, 'black');
    drawCircle(heroPositionX+10, gameCanvas.height-40, 9, 'white');
    drawCircle(heroPositionX+10, gameCanvas.height-40, 5, 'black');
}

function moveHero() {
    moveHeroLeft();
    moveHeroRight();
};

//Bootle movement functions
function moveBootle() {
    botlePositionY = botlePositionY + botleSpeed;

    if(botlePositionY > gameCanvas.height) {
        botleSpeed =  -botleSpeed;
    }
    else if(botlePositionY < 0) {
        botleSpeed = -botleSpeed;
    }
}

//Hero movement functions
function moveHeroLeft() {
    if (heroPositionX > 0){
        heroPositionX = heroPositionX - heroSpeed;
    }
}

function moveHeroRight() {
    if (heroPositionX < gameCanvas.width){
        heroPositionX = heroPositionX + heroSpeed;
    }
}


//Keyboard controls function
function keydownMove(key) {

    if ( key.keyCode == 87 ) {
        alert( key.keyCode );

    }
    if ( key.keyCode == 65  ) { // move left
        moveHeroLeft();
    }
    if ( key.keyCode == 68 ) {
        moveHeroRight();
    }
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

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
//
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
            || window[vendors[x]+'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());


function init (){
}
document.addEventListener("DOMContentLoaded", init);