const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

// create express server
const app = express()
// allow webapp to parse json from request and response bodies
app.use(bodyparser.json())
// cors
app.use(cors())

// define route in express
app.get('/', (req, res) => {
  res.send('hello world!')
})
app.listen(process.env.PORT || 8081)
