class Button
{
    #x;
    #y;
    #width;
    #height;
    #id;

    img;

    constructor(x, y, width, height, id, img)
    {
        this.#id = id;
        this.img = img;

        this.#x = x;
        this.#y = y;
        this.#width = width;

        if(height === "auto")
        {
            this.#height = width * this.img.height/this.img.width;
        } else
        {
            this.#height = height;
        }
    }

    get id() { return this.#id; }

    draw()
    {
        ctx.drawImage(this.img, this.#x, this.#y, this.#width, this.#height);
    }
}