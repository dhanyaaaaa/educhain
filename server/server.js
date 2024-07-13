const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
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
  
  app.post("/api/meetings", (req, res) => {
    const { purpose, mode, meetingId, password, venue, date, time } = req.body;
    const query = "INSERT INTO meeting (purpose, mode, meetingId, password, venue, date, time) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(query, [purpose, mode, meetingId, password, venue, date, time], (err, result) => {
      if (err) throw err;
      res.send({ message: "Meeting scheduled successfully" });
    });
  });
  
  // Route to fetch meeting history
  app.get("/api/meetings", (req, res) => {
    const query = "SELECT * FROM meeting";
    db.query(query, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  });
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
