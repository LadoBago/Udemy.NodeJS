const express = require('express');

const routes = express.Router();

routes.get('/', (req, res, next) => {
    res.render('home', { pageTitle: "Home" });
});


exports.routesHandler = routes;