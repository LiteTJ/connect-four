class Disc
{
    #x;
    #y;
    #id;

    targetIndex;
    state;

    constructor(id)
    {
        this.#id = id;
        this.state = "holding";
    }

    get colour()
    {
        if(this.#id === 1) return "#ffff00";
        if(this.#id === 2) return "#ff0000";
    }

    getY(row, scale)
    {
        return canvas.height - row * scale;
    }

    tick(board, scale)
    {
        switch(this.state)
        {
            case "holding":
                let col = Math.floor(mouse.x / scale);

                this.#x = col * scale;
                this.#y = this.getY(board.noRows, scale);
                break;

            case "dropping":
                let targetY = this.getY(this.targetIndex[0], scale);

                this.#y += scale/2;

                //Sometimes this.#y becomes isNaN if user clicks too fast, but why?
                //Same bug causes disc not to be shown on board
                if(this.#y >= targetY || isNaN(this.#y))
                {
                    this.#y = targetY;
                    this.state = "resting";
                }

                break;
        }
    }

    draw(scale)
    {
        let xCentre = this.#x + scale/2,
            yCentre = this.#y - scale/2;

        ctx.save();

        ctx.lineWidth = "2";
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(xCentre, yCentre, scale*0.4, 0, 2*Math.PI);
        ctx.fill();

        ctx.restore();
    }
}