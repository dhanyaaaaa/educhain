const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "school",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
});

// Endpoint to save fees data

app.post("/save-fees", (req, res) => {
  const { className, fees } = req.body;

  console.log(className);
  console.log(fees);

  const query = `
    INSERT INTO fees (class, school_fees, exam_fees, uniform_fees, textbook_fees, extracurricular_fees)
    VALUES (?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE 
      school_fees = VALUES(school_fees), 
      exam_fees = VALUES(exam_fees), 
      uniform_fees = VALUES(uniform_fees), 
      textbook_fees = VALUES(textbook_fees), 
      extracurricular_fees = VALUES(extracurricular_fees)
  `;

  const values = [
    className,
    fees.school_fees,
    fees.exam_fees,
    fees.uniform_fees,
    fees.textbook_fees,
    fees.extracurricular_fees,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving fees data");
    } else {
      res.send("Fees data saved successfully");
    }
  });
});


// Endpoint to get all fees data
app.get("/get-all-fees", (req, res) => {
    const query = "SELECT * FROM fees";
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching all fees data");
      } else {
        res.json(results);
      }
    });
  });
  
  app.get('/meetings', (req, res) => {
    db.query('SELECT * FROM meetings', (err, results) => {
      if (err) {
        console.error('Error fetching meetings:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/meetings', (req, res) => {
    const meeting = req.body;
    db.query('INSERT INTO meetings SET ?', meeting, (err, result) => {
      if (err) {
        console.error('Error inserting meeting:', err);
        res.status(500).send('Internal server error');
      } else {
        res.json({ id: result.insertId, ...meeting });
      }
    });
  });
  
  app.put('/meetings/:id', (req, res) => {
    const { id } = req.params;
    const meeting = req.body;
    db.query('UPDATE meetings SET ? WHERE id = ?', [meeting, id], (err) => {
      if (err) {
        console.error('Error updating meeting:', err);
        res.status(500).send('Internal server error');
      } else {
        res.send('Meeting updated successfully');
      }
    });
  });
  
  app.delete('/meetings/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM meetings WHERE id = ?', id, (err) => {
      if (err) {
        console.error('Error deleting meeting:', err);
        res.status(500).send('Internal server error');
      } else {
        res.send('Meeting deleted successfully');
      }
    });
  });

 // Get all schools
app.get('/api/schools', (req, res) => {
    const sql = 'SELECT * FROM schools';
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error fetching schools' });
            throw err;
        }
        res.status(200).json(result);
    });
});

// Get a single school by ID
app.get('/api/schools/:id', (req, res) => {
    const schoolId = req.params.id;
    const sql = 'SELECT * FROM schools WHERE id = ?';
    db.query(sql, schoolId, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error fetching school' });
            throw err;
        }
        if (result.length === 0) {
            res.status(404).send({ error: 'School not found' });
        } else {
            res.status(200).json(result[0]);
        }
    });
});

// Add a new school
app.post('/api/schools', (req, res) => {
  const newSchool = req.body;
  const sql = 'INSERT INTO schools SET ?';
  db.query(sql, newSchool, (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error adding school' });
          throw err;
      }
      res.status(201).send('School added successfully');
  });
});

// Update a school by ID
app.put('/api/schools/:id', (req, res) => {
  const schoolId = req.params.id;
  const updatedSchool = req.body;
  const sql = 'UPDATE schools SET ? WHERE id = ?';
  db.query(sql, [updatedSchool, schoolId], (err, result) => {
      if (err) {
          res.status(500).send({ error: 'Error updating school' });
          throw err;
      }
      res.status(200).send('School updated successfully');
  });
});


// Delete a school by ID
app.delete('/api/schools/:id', (req, res) => {
    const schoolId = req.params.id;
    const sql = 'DELETE FROM schools WHERE id = ?';
    db.query(sql, schoolId, (err, result) => {
        if (err) {
            res.status(500).send({ error: 'Error deleting school' });
            throw err;
        }
        res.status(200).send('School deleted successfully');
    });
});


  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

