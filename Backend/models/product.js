


class Product {
    #id;
    #name;
    #description;
    #price;
    #created_at;

    constructor(id, name, description, price) {
        this.#id=id;
        this.#name= name;
        this.#description=description;
        this.#price = price;
        this.#created_at=Date.now;
    }
}