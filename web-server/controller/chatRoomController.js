const ChatRoomModel = require("../model/ChatRoomModel");
const updateChatList = require("./chatListController");
const clearUserUnreadCount = require("./unreadCountController");

// Fetch User Chat Room Details
exports.getUserChatRoom = async (req, res) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;
  try {
    // clear the unread count from chat list table
    await clearUserUnreadCount(roomId, userId);

    const chats = await ChatRoomModel.find({ _id: roomId });
    if (!chats) {
      return res.status(200).json({ success: false, message: "Api Failed" });
    }
    return res.status(200).json({ success: true, data: chats });
  } catch (err) {
    return res.status(200).json({ success: false, message: err });
  }
};

// Create User Chat Room Details
exports.createChatRoom = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(200).json({
      success: false,
      message: "Invalid Data",
    });
  }

  const chatRoom = new ChatRoomModel(body);

  // Save Chat Room messages
  saveRoomAndUpdateChatList(body, res, chatRoom, true);
};

// Update User Chat Room Details
exports.updateChatRoom = async (req, res) => {
  try {
    const body = req.body;
    if (!body) {
      return res.status(200).json({
        success: false,
        message: "Invalid Data",
      });
    }

    console.log("updateChatRoom  => ", body.roomId);

    await ChatRoomModel.find({ userId : body.userId }, async (err, chatRoom) => {
      console.log("CHAT ROOM => ", chatRoom);

      if (err) {
        console.log(err);
        return res.status(200).json({
          success: false,
          message: err.message,
        });
      }


      // Add new message received to Array
      chatRoom[0].chat.push(body.chat[0]);

      // Save Chat Room messages
      saveRoomAndUpdateChatList(body, res, chatRoom, false);
    });
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};

const saveRoomAndUpdateChatList = async (body, res, chatRoom, isNewChat) => {
  try {
    if (isNewChat) {
      await chatRoom.save();
    } else {
      // Update Room ID as mongodb row ID
      await ChatRoomModel.updateOne(
        { _id: chatRoom[0]._id },
        { $set: { chat: chatRoom[0].chat } }
      )
        .then((data) => {
          console.log("chat updated");
        })
        .catch((err) => {
          console.log(err, "eeeeee");
        });
    }

    updateChatList.updateChatList(body, res, chatRoom, isNewChat);
    // updateChaupdateChatList(body, res, chatRoom, isNewChat);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
