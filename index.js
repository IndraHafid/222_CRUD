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

app.get('/api/mahasiswa', (req, res) => {
  db.query('SELECT * FROM mahasiswa', (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.satck);
      res.status(500).send('error fetching users');
      return;
    }
    res.json(results);
  })
})