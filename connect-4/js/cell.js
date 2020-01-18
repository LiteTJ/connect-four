class Cell
{
    #row;
    #col;

    occupied = 0;

    constructor(i, j)
    {
        this.#row = i;
        this.#col = j;
    }

    get colour()
    {
        return "#0000ff";
    }

    draw(scale)
    {
        let x = this.#col * scale,
            y = canvas.height - (this.#row * scale),
            xCentre = x + scale/2,
            yCentre = y - scale/2;

        ctx.save();

        ctx.lineWidth = "2";
        ctx.strokeStyle = this.colour;
        ctx.beginPath();
        ctx.arc(xCentre, yCentre, scale*0.4, 0, 2*Math.PI);
        ctx.stroke();

        ctx.restore();
    }
}