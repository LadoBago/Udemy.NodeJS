const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

const collProducts = "products";

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;

    if (id) {
      this._id = mongodb.ObjectId(id);
    }

    this.userId = userId;
  }

  save() {
    const collection = getDb().collection(collProducts);
    let dbOp;
    if (this._id) {
      dbOp = collection.updateOne({ _id: this._id }, { $set: this });
    } else {
      dbOp = collection.insertOne(this);
    }

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection(collProducts)
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection(collProducts)
      .findOne({ _id: new mongodb.ObjectId(prodId) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => console.log(err));
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection(collProducts)
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted!");
      })
      .catch((err) => console.log(err));
  }
}

module.exports = Product;
