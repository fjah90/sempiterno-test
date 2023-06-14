const { pool } = require('../config/db');

class Document {

    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.content = data.content;
    }

    static async findAll() {
        const { rows } = await pool.query('SELECT * FROM public.documents');
        return rows.map((data) => new Document(data));
    }

    static async findById(id) {
        const { rows } = await pool.query('SELECT * FROM public.documents WHERE id = $1', [id]);
        if (!rows.length) {
            throw new Error(`Document with id ${id} not found`);
        }
        return new Document(rows[0]);
    }

    async save() {
        const { rows } = await pool.query(
            'INSERT INTO public.documents (title, content) VALUES ($1, $2) RETURNING *',
            [this.title, this.content]
        );
        const data = rows[0];
        this.id = data.id;
        return this;
    }

    async update(changes) {

        Object.assign(this, changes);

        const { rows } = await pool.query(
            'UPDATE public.documents SET title = $1, content = $2 WHERE id = $3 RETURNING *',
            [this.title, this.content, this.id]
        );

        const data = rows[0];
        return { check: true, document: new Document(data) };

    }

    async delete() {
        await pool.query('DELETE FROM public.documents WHERE id = $1', [this.id]);
    }
}

module.exports = Document;
