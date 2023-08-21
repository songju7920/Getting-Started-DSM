const router = require("express")();
const user = require("../controller/user");
const authMiddleWare = require("../middleware/token");

//화면 이동
router.get("/logIn", user.moveToLogIn);
router.get("/signUp", user.moveToSignUp);
router.get("/password", user.moveToChangePW);
router.get("/", authMiddleWare, user.moveToWithdrawal);

//CRUD
router.post("/signUp", user.signUp);
router.delete("/", authMiddleWare, user.signOut);
router.post("/logIn", user.logIn);
router.post("/logOut", authMiddleWare, user.logOut);
router.patch("/password", authMiddleWare, user.changePW);
router.get("/profile/:userID", authMiddleWare, user.getUserInfo);

module.exports = router;
