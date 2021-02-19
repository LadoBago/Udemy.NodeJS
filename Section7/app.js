const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const db = require("./util/database");
//const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs', expressHbs({ extname: "hbs", defaultLayout: "main-layout", layoutsDir: "views/layouts/" }));
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "public")));
app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(8080);
