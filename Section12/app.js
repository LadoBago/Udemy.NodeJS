const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

const mongoConnect = require("./util/database").mongoConnect;
const User = require("./models/user");
const { use } = require("./routes/admin");

//const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs', expressHbs({ extname: "hbs", defaultLayout: "main-layout", layoutsDir: "views/layouts/" }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  const it = User.fetchAll();
  it.hasNext()
    .then((hasnext) => {
      console.log(hasnext);
      if (hasnext) {
        return it.next();
      } else {
        const user = new User(
          "Lado",
          "vl.bagoshvili@gmail.com",
          { items: [] },
          null
        );
        return user.save().then((result) => {
          return user;
        });
      }
    })
    .then((user) => {
      req.user = new User(user.username, user.email, user.cart, user._id);
      next();
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  app.listen(8080);
});
