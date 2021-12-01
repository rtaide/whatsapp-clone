//export {};
const express = require ("express");
const router = express.Router();

const {
  getUserChatRoom,
  createChatRoom,
  updateChatRoom,
} = require ("../controller/chatRoomController");
const { getUserLastSeen } = require ("../controller/lastSeenController");
const {authUser} = require ("../middleware/auth");


router.post("/chatRoom", authUser, getUserChatRoom);
router.post("/createRoom", authUser, createChatRoom);
router.post("/updateRoom", authUser, updateChatRoom);
router.post("/lastSeen", authUser, getUserLastSeen);

//export default router;
module.exports = router;

