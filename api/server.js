const express = require('express')
const bodyParser = require('body-parser')
const authMiddleware = require('./middleware/auth')

const server = express()

// Plugins
server.use(bodyParser.json()) // Allows me to have JSPn uploads (POST/PUT/PATCH)
server.use(authMiddleware.initialize)

// Routes
server.use([
  require('./routes/products'),
  require('./routes/auth')
])

// Start the server
server.listen(7000, (error) => {
  if (error) {
    console.error('Error starting', error)
  }
  else {
    console.log('Started at http://localhost:7000')
  }
})