const jwt = require("jsonwebtoken");

const tokenMiddleWare = (req, res, next) => {
  const token = req.session.access_token;

  if (!token) {
    res.render("../views/users/logIn", { message: "" });
  }

  try {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) throw new Error(err.message);
      req.decoded = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    res.render("../views/users/logIn", { message: "" });
  }
};

module.exports = tokenMiddleWare;
