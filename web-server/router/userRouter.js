//export {};
const express =require ("express");
const { loginUser, getLoggedInUserList } =require ("../controller/authController");
const {authUser} =require ("../middleware/auth");

const router = express.Router();

router.get("/userList", authUser, getLoggedInUserList);
router.post("/loginUser", loginUser);

module.exports = router;

//export default router;
