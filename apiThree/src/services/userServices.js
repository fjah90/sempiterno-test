const bcrypt = require('bcrypt');
const { pool } = require('../config/db');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
    }

    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM auth.users');
        return rows.map((data) => new User(data));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM auth.users WHERE id = $1', [id]);
        if (!rows.length) {
            throw new Error(`User with id ${id} not found`);
        }
        return new User(rows[0]);
    }

    static async findByEmail(email) {
        const { rows } = await pool.query('SELECT * FROM auth.users WHERE email = $1', [email]);
        return rows[0] ? new User(rows[0]) : null;
    }

    async save() {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        const { rows } = await pool.query(
            'INSERT INTO auth.users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [this.name, this.email, hashedPassword]
        );
        const data = rows[0];
        this.id = data.id;
        this.password = hashedPassword;
        return this;
    }

    async update(changes) {

        // console.log(changes)
        let flag = true;

        if (changes.password) {
            changes.password = await bcrypt.hash(changes.password, 10);
            this.password = changes.password;
        }

        const result = await pool.query('SELECT email FROM auth.users WHERE id != $1', [changes.id]);
        const emailToCheck = result.rows;

        emailToCheck.forEach((row) => {
            const email = row.email;
            flag = email == changes.email ? false : flag;
            console.log(email);
        });

        Object.assign(this, changes);
        console.log(flag);
        if (flag) {

            const { rows } = await pool.query(
                'UPDATE auth.users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
                [this.name, this.email, this.password, this.id]
            );

            const data = rows[0];
            return { check: true, user: new User(data) };
        } else {
            return { check: false };
        }

    }

    async delete() {
        await pool.query('DELETE FROM auth.users WHERE id = $1', [this.id]);
    }

    comparePassword(password) {
        return bcrypt.compareSync(password, this.password);
    };
}

module.exports = User;