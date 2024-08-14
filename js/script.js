//Game Constants and Variables
let direction = { x: 0, y: 0 };
const foodSound = new Audio('food.mp3');
const gameOverSound = new Audio('gameover.mp3');
const moveSound = new Audio('move.mp3');
const musicSound = new Audio('move.mp3');
let speed=2;
let lastPaintTime = 0;
let snakeArr = [
    {x:13 , y:15}
]

//Game Fuctions
function main(ctime) {


    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime= ctime; 
    gameEngine();
}

function gameEngine(){
    //Part 1: Updating the snake array


    //Part 2: Render the snake of Food
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y; 
        snakeElement.style.gridColumnStart = e.x;
        snakeElement.classList.add('food');
        board.appendChild(snakeElement);
    })
}









//Main Logic starts here
window.requestAnimationFrame(main);