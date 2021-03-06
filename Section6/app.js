const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const expressHbs = require('express-handlebars');

const app = express();

// app.engine('hbs', expressHbs({ extname: "hbs", defaultLayout: "main-layout", layoutsDir: "views/layouts/" }));
app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
   res.status(404).render('404', { docTitle: 'Page Not Found' });
});

app.listen(8080);