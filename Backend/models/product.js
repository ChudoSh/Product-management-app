import { queryPool } from '../config/db/mysqlSetup.js';
import { getCollection } from '../config/db/mongodbSetup.js';

class Product {
    #id;
    #name;
    #description;
    #price;
    #created_at;

    constructor(id, name, description, price, created_at = new Date()) {
        this.#id = id;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#created_at = created_at instanceof Date ? created_at : new Date(created_at);
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get description() { return this.#description; }
    get price() { return this.#price; }
    get created_at() { return this.#created_at; }

    set name(value) { this.#name = value; }
    set description(value) { this.#description = value; }
    set price(value) { this.#price = value; }

    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            description: this.#description,
            price: this.#price,
            created_at: this.#created_at,
        };
    }

    static async findAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit;
        const sql = 'SELECT * FROM products ORDER BY created_at DESC LIMIT ? OFFSET ?';
        const [products, _] = await queryPool(sql, [limit, offset]);
        
        const [countResult] = await queryPool('SELECT COUNT(*) as total FROM products');
        const total = countResult[0].total;
        
        return {
            data: products.map(p => new Product(
                p.id,
                p.name,
                p.description,
                p.price,
                p.created_at,
                p.updated_at
            )),
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        };
    }

    static async findById(id) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        const [products, _] = await queryPool(sql, [id]);
        
        if (products.length === 0) return null;
        
        const p = products[0];
        return new Product(
            p.id,
            p.name,
            p.description,
            p.price,
            p.created_at,
            p.updated_at
        );
    }

    static async create(name, description, price) {
        const sql = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
        const result = await queryPool(sql, [name, description, price]);
        const id = result[0].insertId;
        
        const product = await this.findById(id);

        await this.syncToMongoDB(product);
        
        return product;
    }

    async update() {
        const sql = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
        await queryPool(sql, [this.#name, this.#description, this.#price, this.#id]);
        
        await Product.syncToMongoDB(this);
        
        return this;
    }

    static async delete(id) {
        const sql = 'DELETE FROM products WHERE id = ?';
        await queryPool(sql, [id]);
        
        const collection = getCollection('products');
        await collection.deleteOne({ product_id: id });
        
        return true;
    }

    static async clearAll() {
        const sql = 'TRUNCATE TABLE products';
        await queryPool(sql);
        
        const collection = getCollection('products');
        await collection.deleteMany({});
    }

    static async syncToMongoDB(product) {
        const collection = getCollection('products');
        
        const mongoProduct = {
            product_id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            created_at: product.created_at,
        };
       
        await collection.updateOne(
            { product_id: product.id },
            { $set: mongoProduct },
            { upsert: true }
        );
    }
}

export default Product;