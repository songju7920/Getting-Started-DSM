const router = require("express")();
const post = require("./post");
const user = require("./user");

router.use("/post", post);
router.use("/user", user);
router.get("/", (req, res) => res.render("board/index"));

module.exports = router;
