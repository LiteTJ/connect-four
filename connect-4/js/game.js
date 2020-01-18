class Game
{
    #noRows = 6;
    #noCols = 7;
    #currentPlayerIndex;
    state;

    board;
    players = [];
    discs = [];
    currentDisc;

    constructor()
    {
        this.board = new Board(6, 7);
        this.players.push(new Player(1), new Player(2));
        this.#currentPlayerIndex = 0;
        this.state = "playing";

        this._createDisc();

        this._setEventHandlers();
    }

    get currentPlayer()
    {
        return this.players[this.#currentPlayerIndex];
    }

    get scale()
    {
        return Math.min(
            canvas.width / this.#noCols,
            canvas.height / (this.#noRows + 1)
        );
    }

    get gameOver()
    {
        return (
            this.state === "yellow-wins" ||
            this.state === "red-wins" ||
            this.state === "draw"
        );
    }

    _createDisc()
    {
        this.currentDisc = new Disc(this.currentPlayer.id);
        this.discs.push(this.currentDisc);
    }

    _nextPlayer()
    {
        this.#currentPlayerIndex++;

        if(this.#currentPlayerIndex >= this.players.length) this.#currentPlayerIndex = 0;
    }

    _checkResult()
    {
        let playerOneWin = this.board.checkWin(this.players[0].id),
            playerTwoWin = this.board.checkWin(this.players[1].id);

        if(playerOneWin) this.state = "yellow-wins";
        if(playerTwoWin) this.state = "red-wins";

        if(!playerOneWin && !playerTwoWin)
        {
            if(this.board.isFull) this.state = "draw";
        }
    }

    _setEventHandlers()
    {
        canvas.onmousemove = (e) => {
            let rect = canvas.getBoundingClientRect(e);

            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        canvas.onclick = (e) => {
            if(this.state === "playing")
            {
                let col = Math.floor(mouse.x / this.scale);

                let pos = this.currentPlayer.dropDisc(this.board, col);

                if(pos !== false)
                {
                    this.currentDisc.targetIndex = pos;
                    this.currentDisc.state = "dropping";
                    this.state = "animation";
                }
            }
        }
    }

    _displayResult()
    {
        let text;

        switch(this.state)
        {
            case "yellow-wins":
                text = "Yellow Wins";
                break;
            case "red-wins":
                text = "Red Wins";
                break;
            case "draw":
                text = "Tie Game";
                break;
        }

        ctx.save();

        let textSize = this.scale * 0.4,
            height = canvas.height - this.scale * this.#noRows - this.scale/2 + textSize/2;

        ctx.font = textSize + "px Trebuchet MS";
        ctx.fillStyle = "#0000ff";
        ctx.textAlign = "center";
        ctx.fillText(text, canvas.width/2, height);

        ctx.restore();
    }

    tick()
    {
        //Business logic
        this.discs.forEach(disc => {
            disc.tick(this.board, this.scale);
        });

        switch(this.state)
        {
            case "animation":
                if(this.currentDisc.state === "resting")
                {
                    this._checkResult();
                    this._nextPlayer();
                    if(!this.gameOver) this._createDisc();

                    if(this.state === "animation") this.state = "playing";
                }

                break;
        }

        //GUI
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.discs.forEach(disc => {
            disc.draw(this.scale);
        });

        this.board.draw(this.scale);

        if(this.gameOver)
        {
            this._displayResult();
        } else
        {
            //Next frame
            window.requestAnimationFrame(() => { this.tick(); });
        }
    }
}