//game constants
let inputDir = { x: 0, y: 0 };
const food_sound = new Audio('food.mp3');
const gameover_sound = new Audio('gameover.mp3');
const move_sound = new Audio('move.mp3');
const music_sound = new Audio('music.mp3');
let speed = 6;
let lastpaintime = 0;
let snake_array = [{ x: 13, y: 15 }];
let score = 0;
food = { x: 6, y: 7 };


//game functions
function main(ctime) {
    // ctime = current time
    window.requestAnimationFrame(main);
    if ((ctime - lastpaintime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintime = ctime;
    // console.log(ctime);
    gameEngine();
}

function gameEngine() {
    //part-1 : updating the snake array
    if (isCollide(snake_array)) {
        gameover_sound.play();
        music_sound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over ..please press any key to play again..");
        snake_array = [{ x: 13, y: 15 }]; // reset the snake.
        // music_sound.play();
        score = 0;

    }
    // if you have eaten the food , then incremenet the score and create new food in different position..
    if (snake_array[0].x === food.x && snake_array[0].y === food.y) {
        // food_sound.play();
        score = score + 1;
        //highscore updation
        if (score > val) {
            val = score;
            localStorage.setItem("high_score", JSON.stringify(val));
            highscorecard.innerHTML = "Highscore = " + val;
        }

        scorecard.innerHTML = "score = " + score;
        snake_array.unshift({ x: snake_array[0].x + inputDir.x, y: snake_array[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: 2 + Math.round(a + (b - a) * Math.random()), y: 2 + Math.round(a + (b - a) * Math.random()) };
    }


    //moving the snake..

    for (let i = snake_array.length - 2; i >= 0; i--) {
        snake_array[i + 1] = { ...snake_array[i] };
    }
    snake_array[0].x += inputDir.x;
    snake_array[0].y += inputDir.y;


    //part-2: display the snake 
    board.innerHTML = "";
    snake_array.forEach((e, index) => {
        snakeElement = document.createElement('div');
        // (row = y axis) and (column  = x axis)
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //part-3: display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}
//collide function
function isCollide(snake) {

    // if you collide to youself..
    for (let i = 1; i < snake_array.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // if you collide with the borders
    if (snake[0].x >= 19 || snake[0].x <= 0 || snake[0].y >= 19 || snake[0].y <= 0) {
        return true
    }
    return false;
}


//main logic
//highscore
let high_score = localStorage.getItem("high_score");
if (high_score === null) {
    val = 0;
    localStorage.setItem("high_score", JSON.stringify(val));
}
else {
    val = JSON.parse(high_score);
    highscorecard.innerHTML = "Highscore = " + val;
}


window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = { x: 0, y: 1 } //  start the game
    // move_sound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});
















