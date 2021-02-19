const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const handleBars = require('express-handlebars');

const usersRoutes = require('./routes/users');
const HomeRoutes = require('./routes/home');

const app = express();
const port = 8080;

const hbs = handleBars.create({
    extname: 'hbs',
    defaultLayout: 'main-layout.hbs',
    layoutsDir: 'views/layouts',
    helpers: {
        section: function(name, options) {
            if (!this._sections)
            {
                this._sections = {};
            }

            this._sections[name] = options.fn(this);
            return null;
        }
    }
});

//app.engine('hbs', hbs.engine);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(usersRoutes.routesHandler);
app.use(HomeRoutes.routesHandler);


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
