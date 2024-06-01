const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const history = require('connect-history-api-fallback')

// create express server
const app = express()
// allow webapp to parse json from request and response bodies
app.use(bodyparser.json())
// cors
app.use(cors())

// set secure content policy for all header files
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; script-src 'self' 'unsafe-inline' http://localhost:8080 http://localhost:8098; connect-src 'self' ws://localhost:8080 ws://localhost:8098;"
  )
  next()
})

// history middleware
app.use(history({
  disableDotRule: true,
  verbose: true,
  rewrites: [
    { from: /^\/.*$/, to: '/index.html' }
  ]
}))

// serve static files from vue production folder client/dist
const distPath = path.resolve(__dirname, '..', '..', 'client', 'dist')
const staticFileMiddleware = express.static(distPath)
app.use(staticFileMiddleware)

// define 404 route in express
app.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    "default-src 'self'; script-src 'self' 'unsafe-inline' http://localhost:8080 http://localhost:8098; connect-src 'self' ws://localhost:8080 ws://localhost:8098;"
  )
  res.sendFile(path.join(distPath, 'index.html'))
})

// define and listen on port
const port = process.env.PORT || 8081
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
