const authController = require("../controllers/authController");

const router = require("express").Router();
const { verifyToken } = require("../controllers/middlewareController");

//REGISTER
router.post("/register", authController.registerUser);
router.get("/register", async (req, res) => {
    res.send("ok")
});

//REFRESH TOKEN
router.post("/refresh", authController.requestRefreshToken);
//LOG IN
router.post("/login", authController.loginUser);
//LOG OUT
router.post("/logout", verifyToken, authController.logOut);
router.get("/fetchToken", authController.fetchToken)
module.exports = router;