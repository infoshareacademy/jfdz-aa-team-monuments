var elementsProperties = {

    frames: 8,

    bottles: {
        number: [],
        speed: 1
    },
    hero: {
        positionX: 400,
        positionY:760,
        health: 999,
        speed: 0,
        animationSpeed : 17
    },
    player: {
        score: 0,
        health: 100
    }
};

$( document ).ready(function() {
    
    console.log( "Ekran powitalny - Let's play some game!" );

    drawRect(0, 0, gameCanvas.width, gameCanvas.height, '#D13208');
    drawImageElement('images/beers.png',340,130, 150, 150);
    drawText('AA Team', '45px Impact, Charcoal, sans-serif', '#E9AD0E', 'center' , 325, 340 );

    $('#restart-btn').click(startGame);
    $('#start-btn').click(startGame);

});

function startGame() {

    bottlesNumber = elementsProperties.bottles.number;
    bottlesSpeed = elementsProperties.bottles.speed;

    hero = elementsProperties.hero;
    player = elementsProperties.player;

    for (var i = 0; i<10; i++) {
        bottlesNumber.push({
            positionX: Math.floor(Math.random()*780),
            positionY: i * -100
        });
    }
    console.log('Real game starts here!');

    setInterval(function(){
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
    function paintBottles() {

        bottlesNumber.forEach(myFunction);

        function myFunction(item,index) {
            var bottlePositionX = bottlesNumber[index].positionX;
            var bottlePositionY = bottlesNumber[index].positionY;
            var heroRange = bottlePositionX > hero.positionX - 45 && bottlePositionX < hero.positionX + 45;

            if (bottlePositionY < gameCanvas.height-45) {
                drawRect(bottlePositionX, bottlePositionY, 20, 35, 'blue');
                moveBottle(index);

                if (bottlePositionY >= gameCanvas.height -46 && heroRange) {
                    player.score +=10;
                    $('#score').text(player.score);
                    console.log("score: " + player.score);
                }

                else if (bottlePositionY >= gameCanvas.height-46 && !heroRange) {
                    player.health -= 10;
                    $('#health').text(player.health);
                    console.log("Hero health: " + player.health);
                }
            }
        }

    }

    function moveBottle(elem) {
        bottlesNumber[elem].positionY += bottlesSpeed;
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
    }