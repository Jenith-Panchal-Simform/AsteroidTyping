//random Array
let randomArray: string[] = [
    "stab",
    "integrity",
    "sum",
    "childish",
    "twist",
    "blonde",
    "black",
    "calm",
    "sow",
    "load",
    "majority",
    "jam",
    "wedding",
    "incident",
    "mutter",
    "lung",
    "computer",
    "ideal",
    "abridge",
    "indirect",
    "momentum",
    "bitter",
    "therapist",
    "mine",
    "wolf",
];
//asteroid type
type asteroid =
    | {
          image: HTMLElement;
          span: HTMLElement;
          x: number;
          y: number;
          velocityX: number;
          velocityY: number;
      }
    | undefined;
//initializations
let lives = 3;
let score = 0;
let gameBodyTop: number;
let gameBodyWidth: number;
let gameBodyBottom: number;

let liveContainer = document.getElementById("lives") as HTMLElement;

let scoreContainer = document.getElementById("score") as HTMLElement;
let asteroidHeight = 50;
let asterroidWidth = 50;
let asteroids: asteroid[] = [];

let inputBox = document.getElementById("input") as HTMLInputElement;
let resetBtn = document.getElementById("reset") as HTMLButtonElement;

let gameBody = document.getElementById("game-body") as HTMLElement;
if (gameBody instanceof HTMLElement) {
    gameBodyTop = gameBody.offsetTop;
    gameBodyWidth = gameBody.offsetWidth;
    gameBodyBottom = gameBodyTop + gameBody.offsetHeight;
}
//shuffleArray
function shuffleArray(arr: string[]): string[] {
    let random;
    for (let i = arr.length - 1; i > 0; i--) {
        random = Math.floor(Math.random() * (i + 1));
        //swap
        if (arr[random] !== undefined && arr[i] !== undefined) {
            const temp1 = arr[i]!;
            const temp2 = arr[random]!;
            arr[i] = temp2;
            arr[random] = temp1;
        }
    }
    return arr;
}

//onload
window.onload = function () {
    startGame();
    setInterval(() => {
        moveAsteroid();
    }, 1000 / 60);
};
let arr: string[] = shuffleArray(randomArray);

//start the game
function startGame() {
    liveContainer.innerText = String(lives);
    scoreContainer.innerText = String(score);
    //drop images from Top
    for (let i = 0; i < 4; i++) {
        //<div><img id="arr[0]" src="image"><span>arra[0]<span></div>
        let asteroidContainer: HTMLDivElement = document.createElement("div");
        let asteroidSpan: HTMLSpanElement = document.createElement("span");
        if (asteroidSpan) {
            asteroidSpan.innerText = String(arr[i]);
            asteroidSpan.classList.add("asteroid-span");
        }
        let asteroid: HTMLImageElement = document.createElement("img");
        asteroid.src = "./assets/asteroid.png";
        asteroid.height = asteroidHeight;
        asteroid.width = asterroidWidth;
        asteroidContainer.classList.add("asteroid");

        asteroidContainer.style.background = "./assets/asteroid.png";
        asteroidContainer.style.width = asterroidWidth + "px";
        asteroidContainer.style.height = asteroidHeight + "px";
        asteroidContainer.appendChild(asteroid);
        asteroidContainer.appendChild(asteroidSpan);
        if (gameBody instanceof HTMLElement) {
            gameBody.appendChild(asteroidContainer);
        }
        let asteroidObj = {
            image: asteroidContainer,
            span: asteroidSpan,
            x: randomPosition(gameBodyWidth - asterroidWidth),
            y: gameBodyTop,
            velocityX: randomPosition(2),
            velocityY: randomPosition(1),
        };

        asteroids.push(asteroidObj);
    }
}
//random function
function randomPosition(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
}
function moveAsteroid() {
    if(asteroids.length<=0)
    {
        resetGame()
    }
    for (let i = 0; i < asteroids.length; i++) {
        let asteroidContainer = asteroids[i];
        if (asteroidContainer) {
            asteroidContainer.y += asteroidContainer.velocityY;

            asteroidContainer.image.style.transform = `translate3d(${asteroidContainer.x}px, ${asteroidContainer.y}px, 0)`;

            if (asteroidContainer.y + asteroidHeight > gameBodyBottom) {
                asteroids = asteroids.filter(
                    (item) => item !== asteroidContainer,
                );
                asteroidContainer.image.style.display = "none";
                lives--;
                liveContainer.innerText = String(lives);
                if (lives <= 0 || asteroids.length <= 0) {
                    resetGame();
                }
            }
        }
    }
}
let asteroidFind: asteroid;
if (inputBox) {
    inputBox.addEventListener("keydown", (e) => {
        const typed = e.key;
        if (!asteroidFind) {
            asteroidFind = asteroids.find((obj) => {
                const currentText = obj?.span.innerText[0];
                if (typed == currentText) return obj;
            }) as asteroid;
        }
        if (asteroidFind) {
            const currentText = asteroidFind?.span.innerText;
            // Case 1: span starts with typed string
            if (currentText?.startsWith(typed) && typed.length > 0) {
                asteroidFind.span.innerText = processStrings(
                    currentText,
                    typed,
                );
            }
            // Case 2: span equals typed string
            if (currentText === typed) {
                // Remove from DOM
                asteroidFind.image.remove();
                // Remove from array
                asteroids = asteroids.filter((item) => item !== asteroidFind);
                asteroidFind = undefined;
                //increase Score
                score++;
                scoreContainer.innerText = String(score);
                inputBox.value = "";
            }
        }
    });
}
function processStrings(str1: string, str2: string) {
    // If str1 starts with str2, return the remaining part
    if (str1.startsWith(str2)) {
        return str1.slice(str2.length);
    }
    return str2;
}

//reset handler
let called = false;
async function resetGame() {
    if (called) {
        return;
    }
    called  =true
    let gameOver = new Audio("./assets/gameover.mp3");
    gameOver.play();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    let el = confirm("Your score is: " + score + " Do You want to paly again?");
    score = 0;
    scoreContainer.innerText = String(0);

    lives = 0;
    liveContainer.innerText = String(0);
    if (el) {
        location.reload();
    }
}
resetBtn.addEventListener("click", resetGame);
