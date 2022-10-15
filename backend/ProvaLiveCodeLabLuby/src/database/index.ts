import { createConnection } from "typeorm"

createConnection()
  .then(async () => { console.log("Connection to the database executed") })
  .catch(async () => { console.error("Failed to execute database connection") })
