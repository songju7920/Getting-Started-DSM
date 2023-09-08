module.exports = (req, res) => {
  let isLogined = false;
  let user = null;
  if (req.session.access_token) {
    isLogined = true;
  }

  res.render("board/index", { isLogined, user });
};
