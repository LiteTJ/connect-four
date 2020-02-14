class GUI
{
	static drawGameOver(result, scale, noRows)
	{
		let text;

		if(result === "yellow-wins") text = "Yellow Wins";
		if(result === "red-wins") text = "Red Wins";
		if(result === "draw") text = "Tie Game";

		let textSize = scale * 0.4,
            height = canvas.height - scale * noRows - scale/2 + textSize/2;

        ctx.save();

        ctx.font = textSize + "px Trebuchet MS";
        ctx.fillStyle = "#0000ff";
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width/2, height);

        ctx.restore();
	}
}