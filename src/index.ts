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
type asteroid = {
    image: HTMLElement;
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
};
let lives = 3;
let score = 0;
let gameBodyTop: number;
let gameBodyWidth: number;
let gameBodyBottom: number;
let liveContainer: HTMLElement = document.getElementById(
    "lives",
) as HTMLElement;
let scoreContainer: HTMLElement = document.getElementById(
    "score",
) as HTMLElement;
let gameBody: HTMLElement = document.getElementById("game-body") as HTMLElement;
if (gameBody instanceof HTMLElement) {
    gameBodyTop = gameBody.offsetTop;
    gameBodyWidth = gameBody.offsetWidth;
    gameBodyBottom = gameBodyTop + gameBody.offsetHeight;
}
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
let asteroidHeight = 50;
let asterroidWidth = 50;
let asteroids: asteroid[] = [];
window.onload = function () {
    startGame();
    setInterval(() => {
        moveAsteroid();
    }, 1000 / 60);
};
function startGame() {
    liveContainer.innerText = String(lives);
    scoreContainer.innerText = String(score);
    let arr: string[] = shuffleArray(randomArray);
    //drop images from Top
    for (let i = 0; i < 4; i++) {
        //<img id="arr[0]" src="image">
        let asteroid: HTMLImageElement = document.createElement("img");
        asteroid.src = "./assets/asteroid.png";
        asteroid.height = asteroidHeight;
        asteroid.width = asterroidWidth;
        asteroid.classList.add("asteroid");
        asteroid.id = arr[i] ?? "";
        if (gameBody) {
            gameBody.appendChild(asteroid);
        }
        let asteroidObj = {
            image: asteroid,
            x: randomPosition(gameBodyWidth - asterroidWidth),
            y: gameBodyTop,
            velocityX: randomPosition(2),
            velocityY: randomPosition(1),
        };
        asteroids.push(asteroidObj);
    }
}
function randomPosition(limit: number): number {
    return Math.floor(Math.random() * limit) + 1;
}
function moveAsteroid() {
    for (let i = 0; i < asteroids.length; i++) {
        let asteroid = asteroids[i];
        if (asteroid) {
            asteroid.x = asteroid.x;
            asteroid.y += asteroid.velocityY;
            asteroid.image.style.transform = `translate3d(${asteroid.x}px, ${asteroid.y}px, 0)`;

            if (asteroid.y > gameBodyBottom) {
                asteroid.image.style.display = "none";
                if (lives <= 0) {
                    // console.log("hello")
                    // alert("Your score:",score)
                    // resetGame()
                }
                lives--;
                liveContainer.innerText = String(lives);
            }
        }
    }
}
