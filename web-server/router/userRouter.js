//export {};
const express =require ("express");
const { loginUser, getLoggedInUserList, searchUserByName } =require ("../controller/authController");
const {authUser} =require ("../middleware/auth");

const router = express.Router();

router.get("/userList", authUser, getLoggedInUserList);
router.post("/loginUser", loginUser);

router.post("/searchUser", authUser, searchUserByName);

module.exports = router;

//export default router;
