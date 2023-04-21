# Hono with Bun runtime

## Getting Started

### Cloning the repo

```sh
bun create hono ./NAME_HERE
```

### Development

```
bun run start
```

Open http://localhost:3000 with your browser to see the result.

### For more information

See <https://honojs.dev/>

# 参考

> https://bun.sh
> https://www.youtube.com/watch?v=a_WFb8xU8tc&list=PLT8tjCYKynKsXBrCf7KiQ6Y-6U304DjXT&index=7&ab_channel=TechWebDocs

```bash
curl https://bun.sh/install | bash

bun create

bun create hono ./bun-demo

cd bun-demo

bun start
```

操作sqlite数据库

> https://bun.sh/docs/api/sqlite
> https://github.com/oven-sh/bun/tree/bun-v0.1.5#bunsqlite-sqlite3-module


```js
import { Database } from "bun:sqlite";

const db = new Database("mydb.sqlite");
db.run(
  "CREATE TABLE IF NOT EXISTS foo (id INTEGER PRIMARY KEY AUTOINCREMENT, greeting TEXT)"
);
db.run("INSERT INTO foo (greeting) VALUES (?)", "Welcome to bun!");
db.run("INSERT INTO foo (greeting) VALUES (?)", "Hello World!");

// get the first row
db.query("SELECT * FROM foo").get();
// { id: 1, greeting: "Welcome to bun!" }

// get all rows
db.query("SELECT * FROM foo").all();
// [
//   { id: 1, greeting: "Welcome to bun!" },
//   { id: 2, greeting: "Hello World!" },
// ]

// get all rows matching a condition
db.query("SELECT * FROM foo WHERE greeting = ?").all("Welcome to bun!");
// [
//   { id: 1, greeting: "Welcome to bun!" },
// ]

// get first row matching a named condition
db.query("SELECT * FROM foo WHERE greeting = $greeting").get({
  $greeting: "Welcome to bun!",
});
// [
//   { id: 1, greeting: "Welcome to bun!" },
// ]
```

# 请求

```bash
curl -X POST -d '{"name":"tom", "age":11}' localhost:3000/user
curl localhost:3000/user
```