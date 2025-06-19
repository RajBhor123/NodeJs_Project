const { getPool, sql } = require('../config/database');

class User {
    static async create(userData) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('name', sql.NVarChar, userData.name)
                .input('email', sql.NVarChar, userData.email)
                .query(`
                    INSERT INTO Users (name, email)
                    OUTPUT INSERTED.*
                    VALUES (@name, @email)
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findAll() {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .query('SELECT * FROM Users ORDER BY created_at DESC');
            
            return result.recordset;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Users WHERE id = @id');
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async update(id, userData) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('name', sql.NVarChar, userData.name)
                .input('email', sql.NVarChar, userData.email)
                .query(`
                    UPDATE Users 
                    SET name = @name, email = @email
                    OUTPUT INSERTED.*
                    WHERE id = @id
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query(`
                    DELETE FROM Users 
                    OUTPUT DELETED.*
                    WHERE id = @id
                `);
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        try {
            const pool = await getPool();
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query('SELECT * FROM Users WHERE email = @email');
            
            return result.recordset[0];
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
