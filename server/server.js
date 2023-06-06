const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const app = express();
const port = 8000;
//const secretKey = 'your-secret-key';

const password = 'password';
   const saltRounds = 10;
   bcrypt.hash(password, saltRounds, (error, hash) => {
     if (error) {
       console.error(error);
     } else {
       // Store the hash in the database
       //console.log(hash);
     }
   });

const secretKey = crypto.randomBytes(64).toString('hex');
//console.log(secretKey);

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gate_pass_system'
});

// Enable CORS
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// Handle POST requests for user login
app.post('/api/login', (req, res) => {
    const { loginEmail, password } = req.body;
    //console.log(req.body);
    pool.query('SELECT * FROM users WHERE email = ?', [loginEmail], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.length === 0) {
        res.status(401).send('Invalid email or password');
      } else {
        const user = results[0];
        bcrypt.compare(password, user.password, (error, result) => {
          if (error) {
            console.error(error);
            res.status(500).send('Internal server error');
          } else if (result) {
            const token = jwt.sign({ id: user.id, role: user.role }, secretKey);
            //const token = jwt.sign({ id: user.id, role: user.role }, secretKey, { expiresIn: '4h' });
            const { id, fullname, role, email, entry_emp_no, hostel_id, course_id } = user;
            res.json({ token, id, fullname, role, email, entry_emp_no, hostel_id, course_id });
          } else {
            res.status(401).send('Invalid email or password');
          }
        });
      }
    });
  });

// Verify JWT token middleware
function verifyToken(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).send('Unauthorized');
  } else {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
      } else {
        req.user = decoded;
        next();
      }
    });
  }
}


//(Apply New Gatepass by Student)
app.post('/api/gatepasses', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'student') {
    const { student_id, hostel_id, teacher_id, qr_code, room_no, block_no, leaving_purpose, address, contact_no, leaving_datetime, returning_date, security_clearance, security_clearance_datetime } = req.body;
    pool.query('INSERT INTO gatepasses (student_id, hostel_id, teacher_id, qr_code, pass_status, warden_pass_status, room_no, block_no, leaving_purpose, address, contact_no, leaving_datetime, returning_date, security_clearance, security_clearance_datetime) VALUES (?, ?, ?, ?, ?, ?)', [student_id, hostel_id, teacher_id, qr_code, 'active', 'pending', room_no, block_no, leaving_purpose, address, contact_no, leaving_datetime, returning_date, security_clearance, security_clearance_datetime], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else {
        res.json({ id: results.insertId });
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});

// Handle GET requests for all gatepasses
app.get('/api/gatepasses', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'admin') {
    pool.query('SELECT * FROM gatepasses', (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});

// Handle GET requests for all gatepasses by student id
app.get('/api/gatepasses/:studentId', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'admin' || role === 'teacher' || role === 'security_guard' || role === 'student') {
    const { studentId } = req.params;
    pool.query('SELECT * FROM gatepasses WHERE student_id = ?', [studentId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});


// Fetch Single gatepass by ID
app.get('/api/singlegatepass/:id', verifyToken, (req, res) => {
  const { role, id: userId } = req.user;
  if (role === 'admin' || role === 'teacher' || role === 'security_guard' || role === 'student') {
    const gatepassId = req.params.id;
    const sqlQuery = `
    SELECT gatepasses.*, users.fullname AS fullname, users.entry_emp_no AS entry_emp_no, hostels.hostel_name AS hostel_name, courses.course_name AS course_name 
    FROM gatepasses 
    INNER JOIN users ON gatepasses.student_id = users.id 
    INNER JOIN hostels ON users.hostel_id = hostels.id 
    INNER JOIN courses ON users.course_id = courses.id 
    WHERE gatepasses.id = ?
    `;
    pool.query(sqlQuery, [gatepassId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.length === 0) {
        res.status(404).send('Gatepass not found');
      } else {
        res.json(results[0]);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});




// Handle GET all gatepasses by teacher id
app.get('/api/gatepasses/:teacherId', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'admin' || role === 'teacher' || role === 'security_guard') {
    const { teacherId } = req.params;
    pool.query('SELECT * FROM gatepasses WHERE teacher_id = ?', [teacherId], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});

//(Update Gatepass status by Teacher)
app.put('/api/gatepasses/:id', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'teacher' || role === 'admin') {
    const id = req.params.id;
    const { warden_pass_status } = req.body;
    pool.query('UPDATE gatepasses SET warden_pass_status = ? WHERE id = ?', [warden_pass_status, id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Gatepass not found');
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});


// (Make Gatepass active or inactive by Student)
app.put('/api/student/deletegatepass/:id', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'student' || role === 'admin') {
    const id = req.params.id;
    const { pass_status } = req.body;
    pool.query('UPDATE gatepasses SET pass_status = ? WHERE id = ?', [pass_status, id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Gatepass not found');
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});


// (Make Gatepass verified and completed by security guard)
app.put('/api/gatepasses/:id', verifyToken, (req, res) => {
  const { role } = req.user;
  if (role === 'admin' || role === 'security_guard') {
    const id = req.params.id;
    const {security_clearance, security_clearance_datetime } = req.body;
    pool.query('UPDATE gatepasses SET pass_status = ?, security_clearance = ?, security_clearance_datetime = ? WHERE id = ?', ['completed', security_clearance, security_clearance_datetime, id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      } else if (results.affectedRows === 0) {
        res.status(404).send('Gatepass not found');
      } else {
        res.sendStatus(204);
      }
    });
  } else {
    res.status(403).send('Forbidden');
  }
});

// Start the backend server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});