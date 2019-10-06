const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://wjkmartin:UUgpU6qHz4Lzmn-@cluster0-7ddl5.mongodb.net/admin?retryWrites=true&w=majority";

let _db;

const mongoConnect = callback => {
  MongoClient.connect(uri, {useNewUrlParser: true})
  .then(client => {
    _db = client.db("movieApp");
    console.log("got DB")
    callback();
  })
  .catch(err => {
    console.log(err);
    throw err;
  });
};

const getDb = () => {
  if(_db) {
    
    return _db;
  }
  throw 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
