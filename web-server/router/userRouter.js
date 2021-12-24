//export {};
const express =require ("express");
const { loginUser, getLoggedInUserList, profile, deleteAccount,updateProfile ,searchUserByName} =require ("../controller/authController");
const { uploadProfilePhoto, updateProfilePhoto, removeProfilePhoto } = require("../controller/profile");
const {authUser} =require ("../middleware/auth");

const router = express.Router();
const upload = require('../utils/multer');

router.get("/userList", authUser, getLoggedInUserList);
router.post("/loginUser", loginUser);
//router.post("/profile",profile);
router.delete("/deleteaccount",authUser,deleteAccount);
router.put("/updateprofile",authUser,updateProfile);
//router.post("/updateacc",authUser,updateAcc);

router.post("/uploadProfilePhoto", authUser, upload.single("image"), uploadProfilePhoto);
router.put("/updateProfilePhoto", authUser, upload.single("image"), updateProfilePhoto);
router.delete("/removeProfilePhoto", authUser, removeProfilePhoto);

router.post("/searchUser", authUser, searchUserByName);

module.exports = router;

//export default router;
