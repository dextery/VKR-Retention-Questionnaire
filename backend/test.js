import pg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const { Client } = pg

const client = new Client({
  connectionString: process.env.DATABASE_URL
})

client.on('error', err => {
  console.log('CLIENT ERROR')
  console.log(err)
})

client.on('end', () => {
  console.log('CLIENT END')
})

await client.connect()

console.log('CONNECTED')

for (let i = 1; i <= 20; i++) {

  console.log('QUERY', i)

  const result = await client.query(`
    SELECT
      1 as a,
      2 as b,
      3 as c,
      4 as d,
      5 as e,
      6 as f,
      7 as g,
      8 as h,
      9 as i,
      10 as j
  `)

  console.log(result.rows[0])

  await new Promise(
    resolve => setTimeout(resolve, 100)
  )
}

await client.end()

console.log('FINISHED')