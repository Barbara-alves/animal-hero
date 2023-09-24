var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('./.db');

db.serialize(function() {
  db.run("CREATE TABLE IF NOT EXISTS users ( \
    id INTEGER PRIMARY KEY, \
    username TEXT UNIQUE, \
    email TEXT UNIQUE, \
    hashed_password BLOB, \
    salt BLOB, \
    name TEXT \
  )");
  
  db.run("CREATE TABLE IF NOT EXISTS federated_credentials ( \
    id INTEGER PRIMARY KEY, \
    user_id INTEGER NOT NULL, \
    provider TEXT NOT NULL, \
    subject TEXT NOT NULL, \
    UNIQUE (provider, subject) \
  )");

    db.run("CREATE TABLE IF NOT EXISTS posts ( \
      id INTEGER PRIMARY KEY, \
      user_id INTEGER NOT NULL, \
      local TEXT NOT NULL, \
      especie TEXT NOT NULL, \
      sexo TEXT CHECK(sexo IN ('M', 'F', 'D')), \
      descricao TEXT NOT NULL, \
      foto TEXT, \
      FOREIGN KEY (user_id) REFERENCES users(id) \
      )")

    db.run("CREATE INDEX IF NOT EXISTS posts_user_id ON posts (user_id, sexo, especie)")

});

module.exports = db;