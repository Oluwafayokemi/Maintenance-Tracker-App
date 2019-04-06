import { Pool } from 'pg';
import dotenv from 'dotenv';
import creatUserTable from './createUser';
import createRequestTable from './createRequest';
import { insertUserTable, insertUser2Table, insertUserKayTable } from './seedUserTable';
import { insertRequestTable, insertRequest2Table, insertRequestKayTable } from './seedRequestTable';

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const Query = `${creatUserTable} ${createRequestTable} ${insertUserTable} ${insertUserKayTable} ${insertUser2Table} ${insertRequestTable} ${insertRequestKayTable} ${insertRequest2Table}`;
db.query(Query, () => {
  db.end();
});
