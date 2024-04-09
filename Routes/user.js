const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const WrapAsync = require("../Utils/WrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const usersController = require("../Controllers/users");


router.route("/signup").get(usersController.renderSignupForm).post(WrapAsync(usersController.signup));

router.route("/login").get(usersController.renderLoginForm).post(saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
}),
    usersController.Login
);

router.get("/logout", usersController.Logout);

module.exports = router;