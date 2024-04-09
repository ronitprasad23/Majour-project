const User = require("../Models/user");

module.exports.renderSignupForm = (req,res) =>{
    res.render("users/signup");
};  

module.exports.signup = async(req,res) => {
    try {
        let {username,email,password} = req.body;
        const newUser =  new User({email,username});
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            req.flash("success", "Welcome to Vacation Villa");
            res.redirect("/Listings");
        });
    } 
    catch(err) {
        req.flash("error", err.message);
        res.redirect("/signup");
    } 

};

module.exports.renderLoginForm = (req,res) => {
    res.render("users/login");
};

module.exports.Login = async(req,res) => {
    req.flash("success", "Welcome back to Vacation villa!");
    let redirectUrl = res.locals.redirectUrl || "/Listings";
    res.redirect( redirectUrl );
};

module.exports.Logout = (req,res,next) => {
    req.logout((err) => {
        if(err) {
            next(err);
        }
        req.flash("success", "You are logged out!");
        res.redirect("/Listings");
    })
};