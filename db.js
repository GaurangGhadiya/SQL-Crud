const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    password : 'password',
    port : 5432,
    host : 'localhost',
    database : 'todo'
})

pool.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
    }
    console.log('Connected to the database');
  });



module.exports = pool