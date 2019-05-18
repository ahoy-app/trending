import loki from 'lokijs'

const db = new loki('loki.json')
const trending = db.addCollection('trending')

export default async () => {
  console.log('Connecting to Db')
  return await trending
}
