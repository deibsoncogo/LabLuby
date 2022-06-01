import { createConnection } from 'typeorm'

createConnection()
  .then(async (connection) => { console.log('TypeORM connection =>', typeof connection, connection) })
  .catch(async (error) => { console.log('TypORM error =>', typeof error, error) })
