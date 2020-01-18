const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const mouse = {
    x: 0,
    y: 0
}

window.onload = () => {
    console.log("Connect 4 by LiteTJ");
    console.log("---------------------------------------------------------");
    console.log("Bugs:");
    console.log("If user clicks fast, a disc may not show on the board (Business logic is consistent but not GUI)");

    const GAME = new Game();
    GAME.tick();
}