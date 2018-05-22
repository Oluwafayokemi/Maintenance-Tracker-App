import pg from 'pg';

const config = {
  user: 'postgres',
  database: 'maintenance-tracker',
  password: '',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}

const db = new pg.Pool(config);

export default db;