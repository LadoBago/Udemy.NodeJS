const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const User = require("./models/user");

//const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs', expressHbs({ extname: "hbs", defaultLayout: "main-layout", layoutsDir: "views/layouts/" }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const it = User.findOne().then((user) => {
    if (user) {
      req.user = user;
    } else {
      const user = new User({
        name: "Lado",
        email: "vl.bagoshvili@gmail.com",
        cart: { items: [] },
      });
      return user.save().then((result) => {
        req.user = user;
      });
    }
    next();
  });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://lado:Z9cTv45CEvcNuzqf@cluster0.ahwdz.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
