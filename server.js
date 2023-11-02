const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'project-db-stu3.smhrd.com',
    user: 'Insa4_JSB_hacksim_3',
    password: 'aishcool3',
    port: 3307,
    database: 'Insa4_JSB_hacksim_3'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

app.post('/login', (req, res) => {
    const { username, password} = req.body;
    const sql = 'SELECT * FROM users2 WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.json({ status: 'success', message: 'Logged in successfully' });
        } else {
            res.json({ status: 'error', message: 'Invalid username or passwordssss' });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
