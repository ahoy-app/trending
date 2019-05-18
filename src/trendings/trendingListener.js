const onMessageCallback = (db, message) => {
  console.log(message)
}

export default async (db, amqp) => {
  const ch = await amqp.createChannel()
  const q = await ch.assertQueue('', { exclusive: true, autoDelete: true })
  await ch.consume(q.queue, message => {
    //Whenn AMQP message arrives
    if (message) {
      onMessageCallback(db, JSON.parse(message.content))
    } else {
      console.error('Consumer closed by Rabbit')
    }
  })
}
