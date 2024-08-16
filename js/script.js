//Game Constants and Variables
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio('../Sounds/food.mp3');
const gameOverSound = new Audio('../Sounds/gameover.mp3');
const moveSound = new Audio('../Sounds/move.mp3');
const musicSound = new Audio('../Sounds/music.mp3');
let score = 0;
let speed = 2;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 10, y: 9 };


//Game Fuctions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr){
    return false;
}

function gameEngine() {
    //Part 1: Updating the snake array
    if (isCollide(snakeArr)){
        gameOverSound.play;
        musicSound.pause();
        inputDirection = {x:0 ,y:0}  
        alert("Game Over Press any key to play again");
        snakeArr = [ { x: 13, y: 15 }]
        musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y ==food.y && snakeArr[0].x == food.x){
        snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())}
    }

    //Part 2: Render the snake and Food
    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    snakeArr.forEach((e, index) => {
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    })
}




//Main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDirection = {x:0 ,y:1} //start the game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDirection.x = 0;
            inputDirection.y = 1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y = 0;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y = 0;
            break;

        default: 
            break;
    }
});