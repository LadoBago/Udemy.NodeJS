const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://lado:Z9cTv45CEvcNuzqf@cluster0.ahwdz.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });
let _db;

const mongoConnect = (callback) => {
  client.connect((err, result) => {
    if (err) {
      console.log(err);
      throw err;
    } else {
      console.log("Connected!");
      _db = result.db();
      callback();
    }
  });
};

const getDb = () => {
  if (_db) {
    return _db;
  } else {
    throw "No database found!";
  }
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
