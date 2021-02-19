const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
        quantity: { type: Number, require: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product) {
  const cartProductindex = this.cart.items.findIndex((cp) => {
    return cp.productId.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductindex >= 0) {
    newQuantity = this.cart.items[cartProductindex].quantity + 1;
    updatedCartItems[cartProductindex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter(
    (i) => i.productId.toString() !== productId.toString()
  );
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);

// const mongodb = require("mongodb");

// const collUsers = "users";
// const collProducts = "products";
// const collOrders = "orders";

// class User {
//   constructor(username, email, cart, id) {
//     this.username = username;
//     this.email = email;
//     this.cart = cart; // {items: []}
//     this._id = mongodb.ObjectId(id);
//   }

//   save() {
//     const db = getDb();
//     return db.collection(collUsers).insertOne(this);
//   }

//   addToCart(product) {
//     const cartProductindex = this.cart.items.findIndex((cp) => {
//       return cp.productId.toString() === product._id.toString();
//     });

//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductindex >= 0) {
//       newQuantity = this.cart.items[cartProductindex].quantity + 1;
//       updatedCartItems[cartProductindex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({
//         productId: new mongodb.ObjectId(product._id),
//         quantity: newQuantity,
//       });
//     }

//     const updatedCart = {
//       items: updatedCartItems,
//     };
//     const db = getDb();
//     return db
//       .collection(collUsers)
//       .updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }

//   getCart() {
//     const db = getDb();
//     return db
//       .collection(collProducts)
//       .find({
//         _id: {
//           $in: this.cart.items.map((i) => mongodb.ObjectId(i.productId)),
//         },
//       })
//       .toArray()
//       .then((products) => {
//         return products.map((p) => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(
//               (i) => i.productId.toString() === p._id.toString()
//             ).quantity,
//           };
//         });
//       });
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(
//       (i) => i.productId.toString() !== productId.toString()
//     );

//     const db = getDb();
//     return db
//       .collection(collUsers)
//       .updateOne(
//         { _id: this._id },
//         { $set: { cart: { items: updatedCartItems } } }
//       );
//   }

//   addOrder() {
//     const db = getDb();

//     return this.getCart()
//       .then((products) => {
//         const order = {
//           items: products,
//           user: {
//             _id: new mongodb.ObjectId(this._id),
//             name: this.name,
//           },
//         };
//         return db.collection(collOrders).insertOne(order);
//       })
//       .then((result) => {
//         this.cart = { items: [] };
//         return db
//           .collection(collUsers)
//           .updateOne(
//             { _id: new mongodb.ObjectId(this._id) },
//             { $set: { cart: this.cart } }
//           );
//       });
//   }

//   getOrders() {
//     const db = getDb();
//     return db
//       .collection(collOrders)
//       .find({ "user._id": new mongodb.ObjectId(this._id) })
//       .toArray();
//   }

//   static findById(userId) {
//     const db = getDb();
//     return db.collection(collUsers).findOne({ _id: mongodb.ObjectId(userId) });
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection(collUsers).find();
//   }
// }

// module.exports = User;
