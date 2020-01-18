class Player
{
    #id;

    constructor(id)
    {
        this.#id = id;
    }

    get id() { return this.#id; }

    dropDisc(board, col)
    {
        let row = 0;

        while(true)
        {
            if(row >= board.noRows)
            {
                return false; //Chosen column is full
            }

            let cell = board.cells[row][col];

            if(cell.occupied === 0)
            {
                cell.occupied = this.#id;
                return [row, col]; //Disc is dropped
            }

            row++;
        }
    }
}