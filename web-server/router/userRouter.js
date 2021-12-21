//export {};
const express =require ("express");
<<<<<<< Updated upstream
const { loginUser, getLoggedInUserList, searchUserByName } =require ("../controller/authController");
=======
const { loginUser, getLoggedInUserList, profile, deleteAccount,updateProfile } =require ("../controller/authController");
//const { updateProfile } = require("../controller/profile");
>>>>>>> Stashed changes
const {authUser} =require ("../middleware/auth");

const router = express.Router();
const upload = require('../utils/multer');

router.get("/userList", authUser, getLoggedInUserList);
router.post("/loginUser", loginUser);
//router.post("/profile",profile);
router.delete("/deleteaccount",authUser,deleteAccount);
router.put("/updateprofile",authUser,updateProfile);
//router.post("/updateacc",authUser,updateAcc);

router.post("/searchUser", authUser, searchUserByName);

module.exports = router;

//export default router;
