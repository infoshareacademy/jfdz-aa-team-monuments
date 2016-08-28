//

var gameCanvas = document.getElementById('game-canvas');
var gameCanvasContext = gameCanvas.getContext('2d');

//Hero movement functions
function moveHeroLeft() {
    hero = elementsProperties.hero;
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
function drawRect(placementX, placementY, width, height, drawColor) {
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.fillRect(placementX, placementY, width, height)
}

function drawCircle(placementX, placementY, radius, drawColor) {
    gameCanvasContext.fillStyle = drawColor;
    gameCanvasContext.beginPath();
    gameCanvasContext.arc(placementX, placementY, radius, 0, Math.PI*2, true);
    gameCanvasContext.fill();
}

function drawText(text, font, color, align, placementX, placementY ) {
    gameCanvasContext.font = font;
    gameCanvasContext.fillStyle = color;
    gameCanvas.textAlign = align;
    gameCanvasContext.fillText(text, placementX, placementY);
}

function drawImageElement(imagePath, placementX, placementY, scaleX, scaleY ) {
    var img = new Image();

    img.onload = function() {
        gameCanvasContext.drawImage(img, placementX, placementY, scaleX, scaleY);
    };
    img.src = imagePath;
}
