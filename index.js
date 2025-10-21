const express = require('express');
let mysql = require('mysql2');
const app = express();
const port = 3308;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Vm.fidzz22',
  database: 'biodata',
  port: 3308
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to mySQL:', err);
    return;
  }
    console.log('Connected successfully!');
});