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
let gameBodyHeight: number;
let gameBodyWidth: number;
let gameBody: HTMLElement = document.getElementById("game-body") as HTMLElement;
if (gameBody instanceof HTMLElement) {
    gameBodyHeight = gameBody.offsetHeight;
    gameBodyWidth = gameBody.offsetWidth;
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
let asteroidVelocityX = 5;
let asteroidVelocityY = -1;
window.onload = function () {
    startGame();
};
function startGame() {

    let arr: string[] = shuffleArray(randomArray);
    console.log(arr[0], arr[1], arr[2], arr[3]);
    let asteroids = [];
    //drop images from Top
    for (let i = 0; i < 4; i++) {
        //<img id="arr[0]" src="image">
        let asteroid: HTMLImageElement = document.createElement("img");
        asteroid.src = "./assets/asteroid.png";
        asteroid.height = asteroidHeight;
        asteroid.width = asterroidWidth;
        asteroid.id = arr[i] ?? ""; 
        if (gameBody) {
            gameBody.appendChild(asteroid);
        }
        let asteroidObj = {
            image: asteroid,
            x: randomPosition(gameBodyWidth - asterroidWidth),
            y: 0,
            velocityX: asteroidVelocityX,
            velocityY: asteroidVelocityY,
        };
        asteroids.push(asteroidObj);
        console.log("asteroidOBj", asteroidObj);
    }
}
function randomPosition(limit: number): number {
    return Math.floor(Math.random() * limit);
}
