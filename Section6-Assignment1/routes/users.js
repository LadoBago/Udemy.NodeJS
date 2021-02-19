const express = require('express');

const routes = express.Router();
const usersList = [];

routes.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: "Users", users: usersList, anyUser: (usersList.length > 0) });
});
routes.post('/users', (req, res, next) => {
    usersList.push(req.body.username);
    res.redirect('/users');
});
exports.routesHandler = routes;