//apis in this file are used in validate.js

const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json({limit: '15mb'})); //limit for image size in MySQL is 16MB

const os = require('os');

const interfaces = os.networkInterfaces();
const address =
  Object.values(interfaces)
    .flat()
    .find(info => info.family === 'IPv4' && !info.internal)?.address || 'localhost';

app.listen(3000, () => console.log(`Server running on http://${address}:3000`));

//This sets up the MySQL connection pool
//pool is used to manage multiple connections efficiently
//allows for multiple requests to be handled concurrently without creating a new connection each time
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'rapidxc123',
  database: 'jis',
});

module.exports = pool;

pool.query('SELECT 1', (err, results) => {
  if (err) return console.error('Connection failed:', err.message);
  console.log('✅ Connected to the MySQL server (via pool).');
});

app.get('/api/vUser', (req, res) => {
    const { email } = req.query;
    pool.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Email not found, create a login' });
        }
        res.json(results[0]);
    });
});

app.get('/api/vPassword', (req, res) => {
    const { email } = req.query;
    pool.query('SELECT password FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Password incorrect' });
        }
        res.json(results[0]);
    });
});

app.post('/api/createUser', (req, res) => {
    const { email, password } = req.body;
    pool.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(201).json({ message: 'User created successfully' });
    });
});

app.post('/api/updatePassword', (req, res) => {
    const { email, newPassword } = req.body;
    pool.query('UPDATE users SET password = ? WHERE email = ?', [newPassword, email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }
        res.json({ message: 'Password updated successfully' });
    });
});

app.post('/api/deleteUser', (req, res) => {
    const { email } = req.body;
    pool.query('DELETE FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});

app.post('/api/declareLevel', (req, res) => {
    const { email, level } = req.body;
    pool.query('UPDATE users SET level = ? WHERE email = ?', [level, email], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database query failed' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Email not found' });
        }
        res.json({ message: 'Level declared successfully' });
    });
});