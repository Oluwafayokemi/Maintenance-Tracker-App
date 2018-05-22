import knex from 'knex';

const db = knex({
    client: 'postgres',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: '',
      database: 'maintenance-tracker'
    }
  })
  
  db.select('*').from('users').then(data => {
    console.log(data);
  });

  export default db;