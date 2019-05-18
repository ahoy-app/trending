import http from 'http'

import app from './http/app'
import trendingListener from './trendings/trendingListener'

import amqp from './config/amqp'
import db from './config/db'

Promise.all([db(), amqp()])
  .then(([db_conn, amqp_conn]) => {
    app.set('db', db_conn)
    app.set('amqp', amqp_conn)

    const tl = trendingListener(db_conn, amqp_conn)
    const server = http.createServer(app)

    const server_port = process.env.SERVER_PORT

    server.listen(server_port || 3000, () => {
      console.log(`Server started on port ${server.address().port}`)
    })
  })
  .catch(error => {
    console.warn('Error connecting to Mongo DB or Rabbit.' + error)
    process.exit(1)
  })
