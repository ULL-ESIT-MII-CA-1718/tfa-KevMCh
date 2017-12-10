// Script to stop the mongod server
conn = new Mongo();

// use admin
db = conn.getDB("admin");
db.shutdownServer()
