const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const User = require("../models/user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email }).then((user) => {
    if (!user) {
      req.flash("error", "Invalid email or password.");
      return res.redirect("/login");
    }

    bcrypt.compare(password, user.password).then((doMathed) => {
      if (doMathed) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect("/");
          }
        });
      } else {
        req.flash("error", "Invalid email or password.");
      }

      res.redirect("/login");
    });
  });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash("error");
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }

  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        req.flash(
          "error",
          "E-Mail exists already, please pick a different one."
        );
        return res.redirect("/signup");
      }

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then((result) => {
          res.redirect("/login");
          return transporter.sendMail({
            to: email,
            from: "vladimer.bagoshvili@outlook.com",
            subject: "Signup succeeded",
            html: "<h1>You successfully signed up!</h1>",
          });
        });
    })
    .catch((err) => console.log(err));
};
