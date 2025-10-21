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
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('error fetching users');
      return;
    }
    res.json(results);
  })
})

app.post('/api/mahasiswa', (req, res) => {
  const { nama, nim, kelas, prodi } = req.body;

  if (!nama || !nim || !kelas ||!prodi) {
    return res.status(400).json({message: 'nama, nim, kelas, prodi wajib diisi' });
  }

db.query(
    'INSERT INTO mahasiswa (nama, nim, kelas, prodi) VALUES (?, ?, ?, ?)',
    [nama, nim, kelas, prodi],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'database error' });
        }
        res.status(201).json({ message: 'User created successfuly' });
    }
  );
});

app.put('/api/mahasiswa/:id', (req, res) => {
    const userID = req.params.id;
    const { nama, nim, kelas, prodi } = req.body;
    db.query(
        'UPDATE mahasiswa SET nama = ?, nim = ?, kelas = ?, prodi = ? WHERE id = ?',
        [nama, nim, kelas, prodi, userID],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: 'database error' });
            }
            res.status(200).json({ message: 'User updated successfully' });
        }
    );
});

app.delete('/api/mahasiswa/:id', (req, res) => {
    const userID = req.params.id;
    db.query('DELETE FROM mahasiswa WHERE id = ?', [userID], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'database error' });
        }
        res.json({ message: 'User deleted successfully' });
    });
});