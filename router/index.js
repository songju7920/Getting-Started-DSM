const router = require("express")();
const post = require("./post");
const user = require("./user");
const main = require("../controller/main");

router.use("/post", post);
router.use("/user", user);
router.get("/", main);

module.exports = router;
