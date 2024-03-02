// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,
});

const getRecords = async (page) => {
  const offset = (page - 1) * 20;
  const query = {
    text: 'SELECT * FROM records ORDER BY created_at OFFSET $1 LIMIT 20',
    values: [offset],
  };
  const result = await pool.query(query);
  return result.rows;
};

module.exports = {
  getRecords,
};
