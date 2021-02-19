const express = require('express');
const path = require('path');
const mainRoutes = require('./routes/main');


const port = 8080;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(mainRoutes);

app.use((req, res, next) => {

    res.send('Page Not Found');

});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

