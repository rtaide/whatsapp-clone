//export {};
const express = require ("express");
const { getUserChatList } = require ("../controller/chatListController");
const {authUser} = require ("../middleware/auth");

const router = express.Router();

router.get("/chatList", authUser, getUserChatList);

module.exports = router;
//export default router;
