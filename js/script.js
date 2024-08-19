//Game Constants and Variables
let inputDirection = { x: 0, y: 0 };
const foodSound = new Audio('../Sounds/food.mp3');
const gameOverSound = new Audio('../Sounds/gameover.mp3');
const moveSound = new Audio('../Sounds/move.mp3');
const musicSound = new Audio('../Sounds/music.mp3');
let score = 0;
let highestScore = 0;
let speed = 9;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }, { x: 12, y: 15 }, { x: 11, y: 15 }
]
let food = { x: 10, y: 9 };

let username = prompt("Enter your username: ");


//Game Fuctions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(sarr) {
    // console.log(`Snake Head Position: x=${snakeArr[0].x}, y=${snakeArr[0].y}`);

    // if you touch the boarder
    if (snakeArr[0].x <= 0 || snakeArr[0].x >= 18 || snakeArr[0].y <= 0 || snakeArr[0].y >= 18) {
        return true;
    }
    //if you eat yourself
    for (let i = 1; i < snakeArr.length; i++) {
        // console.log(snakeArr[i]);
        if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
            // console.log(`Checking Snake Part: x=${snakeArr[i].x}, y=${snakeArr[i].y}`);
            return true;
        }
    }

    return false;
}

function gameEngine() {
    //Part 1: Updating the snake array
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDirection = { x: 0, y: 0 }
        alert("Game Over Press Enter to play again");
        snakeArr = [{ x: 13, y: 15 }, { x: 12, y: 15 }, { x: 11, y: 15 }];
        musicSound.play();
        score = 0;
    }

    //If you have eaten the food, increment the score and regenerate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score++;
        // snakeArr.unshift({x: snakeArr[0].x + inputDirection.x, y: snakeArr[0].y + inputDirection.y});
        snakeArr.push({ x: snakeArr[snakeArr.length - 1].x, y: snakeArr[snakeArr.length - 1].y });
        let a = 2;
        let b = 16;
        
        while(true){
            food = {
                x: Math.round(a+(b-a)*Math.random()),
                y: Math.round(a+(b-a)*Math.random())
            };
            let isOnSnake = snakeArr.some((segment)=>{
                return segment.x === food.x && segment.y === food.y;
            })
            console.log(isOnSnake)
            if (!isOnSnake){break;}
        }
    }

    //Moving the snake
    if (inputDirection.x != 0 || inputDirection.y != 0) {
        for (let i = snakeArr.length - 2; i >= 0; i--) {
            snakeArr[i + 1] = { ...snakeArr[i] };
        }
    }

    snakeArr[0].x += inputDirection.x;
    snakeArr[0].y += inputDirection.y;


    //Part 2: Render the snake and Food
    // Display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake-body');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    foodElement = document.createElement('img');
    foodElement.src = '../Images/apple.png';
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

    //Display info
    //Name
    let usernameElem = document.getElementById('username');
    usernameElem.textContent = "Player: " + username;
    //Score
    let scoreElem = document.getElementById('score');
    scoreElem.textContent = "Score: " + score;
    //Highest Score
    if (score > highestScore) {
        highestScore = score;
        let highestScoreElem = document.getElementById('highest-score');
        highestScoreElem.textContent = "Highest Score: " + highestScore;
    }
}




//Main Logic starts here
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    //start the game
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            if (inputDirection.y !== 1) {
                inputDirection.x = 0;
                inputDirection.y = -1;
            }
            break;
        case "ArrowDown":
            if (inputDirection.y !== -1) {
                inputDirection.x = 0;
                inputDirection.y = 1;
            }
            break;
        case "ArrowLeft":
            if (inputDirection.x !== 1) {
                inputDirection.x = -1;
                inputDirection.y = 0;
            }
            break;
        case "ArrowRight":
            if (inputDirection.x !== -1) {
                inputDirection.x = 1;
                inputDirection.y = 0;
            }
            break;

        default:
            break;
    }
});