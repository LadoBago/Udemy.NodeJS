module.exports = (req, res, next) => {
  console.log("4- log log log log");

  if (!req.session.isLoggedIn) {
    return res.redirect("/login");
  }
  next();
};
