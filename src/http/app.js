import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'

import routes from './routes'

// Express
const app = express()

// Logging
app.use(morgan('dev'))

// CORS
app.use(cors())

// Body parsing
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Dispatch
app.use((req, res, next) => {
  req.db = app.get('db')
  next()
})

// Error handling
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Internal server error')
})

// Static files
app.use(express.static('public'))
app.use('/', routes)

export default app
