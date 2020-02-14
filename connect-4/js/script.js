const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

/*-------------------------Images-------------------------*/
const img = {};

img.cell = new Image();
img.cell.src = "img/cell.svg";

img.disc_yellow = new Image();
img.disc_yellow.src = "img/disc-yellow.svg";

img.disc_red = new Image();
img.disc_red.src = "img/disc-red.svg";
/*-------------------------End of images-------------------------*/

const mouse = {
    x: 0,
    y: 0
}

let GAME;

window.onload = () => {
    console.log("Connect 4 by LiteTJ");
    console.log("---------------------------------------------------------");
    console.log("Make a menu that allows user to choose mode");
    console.log("Bugs:");
    console.log("If user clicks fast, a disc may not show on the board (Business logic is consistent but not GUI)");

    init();
}

function init()
{
    GAME = new Game(3);
    tick();
}

function reset()
{
    GAME.reset(3);
    tick();
}

function tick()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    GAME.tick();

    if(GAME.gameOver)
    {
        GUI.drawGameOver(GAME.state, GAME.scale, GAME.noRows);
    } else
    {
        window.requestAnimationFrame(tick);
    }
}