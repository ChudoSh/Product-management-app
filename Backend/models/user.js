import bcrypt from 'bcryptjs';
import { queryPool } from '../config/db/mysqlSetup.js';


class User {
  #id;
  #name;
  #email;
  #password;
  #created_at;
  
  constructor(id, name, email, password) {
    this.#id = id;
    this.#name = name;
    this.#email = email;
    this.#password = password;
    this.#created_at = new Date();
  }

  get id() { return this.#id; }
  get name() { return this.#name; }
  get email() { return this.#email; }
  get created_at() { return this.#created_at; }

  toJSON() {
    return {
      id: this.#id,
      name: this.#name,
      email: this.#email,
      created_at: this.#created_at
    };
  }

  async comparePassword(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.#password);
  }

  static async findByEmail(email) {
    const sql = 'SELECT * FROM users WHERE email = ?';
    const [users,_] = await queryPool(sql, [email]);

    if (users.length === 0) return null;
    
    const userData = users[0];
    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password
    );
  }

  static async findById(id) {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const users = await queryPool(sql, [id]);
    
    if (users.length === 0) return null;
    
    const userData = users[0];
    return new User(
      userData.id,
      userData.name,
      userData.email,
      userData.password
    );
  }

  static async create(name, email, password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    const result = await queryPool(sql, [name, email, hashedPassword]);
    
    return new User(result[0].insertId, name, email, hashedPassword);
  }
}

export default User;