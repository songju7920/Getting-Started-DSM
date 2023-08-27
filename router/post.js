const router = require("express")();
const post = require("../controller/post");
const authMiddleWare = require("../middleware/token");

//화면 이동
router.get("/create", authMiddleWare, post.moveToCreatePost);
router.get("/update/:postID", post.moveToUpdatePost);

//CRUD
router.post("/create", authMiddleWare, post.createPost);
router.get("/view/:postID", authMiddleWare, post.getPost);
router.get("/search", post.getPostList);
router.patch("/:postID", authMiddleWare, post.updatePost);
router.delete("/delete/:postID", authMiddleWare, post.deletePost);

module.exports = router;
