const  ChatRoomModel  = require ("../model/ChatRoomModel");
const  updateChatList  = require ("./chatListController");
const  clearUserUnreadCount  = require ( "./unreadCountController"); 

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

    console.log("updateChatRoom  => ", body);
    ChatRoomModel.findOne({ _id: body.roomId }, async (err, chatRoom) => {
      // console.log("CHAT ROOM => ", chatRoom);

      if (err) {
        return res.status(200).json({
          success: false,
          message: err.message,
        });
      }

      // Add new message received to Array
      chatRoom.chat.push(body.chat);

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

exports.saveRoomAndUpdateChatList = async (
  //body: any,******************************************************////////////////////////////////******************************** */
  //res: any,
  //chatRoom: any,
  //isNewChat: Boolean
) => {
  try {
    await chatRoom.save();

    // Update Room ID as mongodb row ID
    await ChatRoomModel.updateOne(
      { _id: chatRoom._id },
      { $set: { roomId: chatRoom._id } }
    );

    updateChatList(body, res, chatRoom, isNewChat);
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
};
