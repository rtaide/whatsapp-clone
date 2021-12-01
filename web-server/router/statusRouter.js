//export {};
const express = require ("express");
const {
  getAllUserStatus,
  createUserStatus,
  setUserStatusViewed,
} = require ("../controller/statusController");
const {authUser} = require ("../middleware/auth");

const router = express.Router();

router.get("/getAllStatus", authUser, getAllUserStatus);
router.post("/createStatus", authUser, createUserStatus);
router.post("/statusViewed", authUser, setUserStatusViewed);

//export default router;
module.exports = router;
