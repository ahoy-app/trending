import stopwords from '../config/stopwords'

function onMessageCallback(db, message) {
  const keywords = message.content
    .split(/[ ,.:;]+/)
    .filter(s => s.length > 0)
    .map(s => s.trim().toLowerCase())
    .filter(s => !stopwords.en.includes(s))

  keywords.forEach(kw => {
    db[kw] = db[kw] ? db[kw] + 1 : 1
  })
}

export default async (db, amqp) => {
  const ch = await amqp.createChannel()
  const q = await ch.assertQueue('', { exclusive: true, autoDelete: true })
  await ch.bindQueue(q.queue, 'event', 'room.#.new_message')
  await ch.consume(q.queue, message => {
    //Whenn AMQP message arrives
    if (message) {
      onMessageCallback(db, JSON.parse(message.content))
    } else {
      console.error('Consumer closed by Rabbit')
    }
  })
}
