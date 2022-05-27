"use strict"

module.exports.getCustomers = async (event) => {
  const mySQL = require("mysql")

  const connection = mySQL.createConnection({
    host: "serverlessmodulo3labluby.cacanuqjjdyn.us-east-1.rds.amazonaws.com",
    user: "serverlessluby",
    password: "Rzmg0DZRFgXuBPjtn6yQ",
    database: "serverlessmodulo3labluby"
  })

  const promise = new Promise((resolve) => {
    connection.query("SELECT * FROM customers", function(err, results) {
      resolve(results)
    })
  })

  const result = await promise

  return {
    statusCode: 200,
    body: JSON.stringify({ results: result }),
  }
}
