import { Hono } from "hono";
import { serveStatic } from 'hono/serve-static.bun';
import { Database } from 'bun:sqlite'

const db = new Database("./sixdb.sqlite")
db.run(
  "create table if not exists user (id INTEGER primary key autoincrement, name text, age INTEGER)"
)

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));

app.get("/", (c) => {
  return c.json({ message: "Hello World!" });
});

interface User {
  id: number
  name: string
  age: number
}

app.get('/user', (c) => {
  const stmt = db.query("select * from user");
  return c.json({ users: stmt.all() })
}).post(async (c) => {
  //curl -X POST -d '{"name":"tom", "age":11}' localhost:3000/user
  // -H 'Content-Type: application/json
  const body: User = await c.req.json()
  console.log(1111, body)
  const name = body.name
  const age = body.age
  const sql = "insert into user (name,age) values (?,?)"
  db.run(sql, [name, age])
  return c.json({ name, age })
}).put(async (c) => {

})

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
