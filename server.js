const fs = require('fs');
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

//foodItems connection

const connection2 = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: "mondbonm56*",
    database: "foodDatabase",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    multipleStatements: true,
    localInfile: true
});

// connection2.query('SET GLOBAL local_infile = 1', (err) => {
//     if (err) {n
//         console.error('Error enabling local_infile:', err);
//     } else {
//         console.log('local_infile enabled successfully');
//     }
// });

app.get('/load-recipes', (req, res) => {
    const sql2 = 
    `LOAD DATA LOCAL INFILE ?
    INTO TABLE foodItems
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    (name, calories);`;

    connection2.query(sql2, ['/Users/dmitripower/Desktop/test_data/recipes.txt'], (err, results) => {
        if(err){
            console.error("❌ ERROR:", err.sqlMessage);
            return res.status(500).json({ message: 'Error loading data', error: err});
        }
        console.log("✅ Data loaded successfully");
        res.json({message: 'Data loaded successfully', results});
    });
});


//Create a mysql connection parameters
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "mondbonm56*",
    database: "entityDatabase",
    multipleStatements: true 
});
//connect to the server
connection.connect(err => {
    if(err){
        console.error(err);
        return;
    }
    console.log("Connected");

    // Read and execute session.sql
    const sql = fs.readFileSync('personalLocal.session.sql', 'utf8');
    connection.query(sql, (err, results) => {
        if (err) {
            console.error("Error executing session.sql:", err);
        } else {
            console.log("session.sql executed successfully.");
        }
    });
});



//API route to handle form submission
app.post('/submit', (req, res) => {

    console.log('Received data: ', req.body);
    const {username, calories} = req.body;

    if(!username){
        return res.status(400).json({ message: 'Username is required'});
    }

    if(!calories || isNaN(calories) | calories <= 0){
        return res.status(400).json({ message: 'Invalid calories value. '});
    }

    const sql = 'INSERT INTO users (username, calories) VALUES (?, ?)';
    connection.query(sql, [username, calories], (err, result) => {
        if(err) {
            console.error('Error inserting data: ', err);
            return res.status(500).json({message: 'Database error', error: err.sqlMessage });
        }
        console.log('Data inserted successfully');
        res.json({ message: 'Data inserted successfully'});
    });
});

app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});