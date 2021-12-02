const ChatListModel = require("../model/ChatListModel");
const  ChatUnreadCountModel  = require("../model/ChatUnreadCountModel");
const { saveUserUnreadCount } = require("./unreadCountController");

// Fetch Main User Chat List
exports.getUserChatList = async (req, res) => {
  const id = req.user.id;
  console.log("USER ID => ", id);
  try {
    const chats = await ChatListModel.find({
      $or: [{ userId: id }, { chatId: id }],
    });
    console.log("getUserChatList => ", JSON.stringify(chats));
    if (!chats) {
      return res.status(200).json({ success: false, message: "Api Failed" });
    }

    for (let index = 0; index < chats.length; index++) {
      const element = chats[index];

      let chatUnreadItem = await ChatUnreadCountModel.findOne({
        roomId: element.roomId,
      });

      // console.log("ChatUnreadCountModel => ", chatUnreadItem);

      if (id === chatUnreadItem.chatId1) {
        element.chatUnreadCount = chatUnreadItem.chatId1Count;
      } else if (id === chatUnreadItem.chatId2) {
        element.chatUnreadCount = chatUnreadItem.chatId2Count;
      } else {
        element.chatUnreadCount = 0;
      }
      chats[index] = element;
    }

    // console.log("ChatUnreadCount RESPONSE => ", chats);

    return res.status(200).json({ success: true, data: chats });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false, message: err });
  }
};

// Update User Chat List=
exports.updateChatList = async (body, res, chatRoom, isNewChat) => {
  if (isNewChat) {
    try {
      body.roomId = chatRoom._id;

      // let count = await getUserUnreadCount(body);
      // body.chatUnreadCount = count;
      body.chatUnreadCount = {userId : body.userId,
        count : 0}
      await saveUserUnreadCount(body,chatRoom, isNewChat);
      

      // let data = await ChatListModel.find({});
      // console.log(data,"kkkkkkkkkkkkkkkkk")

      let result = await ChatListModel.updateOne(
        { roomId: body.roomId },
        body,
        { upsert: true }
      );

      res.status(200).json({
        success: true,
        id: chatRoom._id,
        message: "ChatRoom created successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    try {
      // let count = await getUserUnreadCount(body);
      // body.chatUnreadCount = count;
      body.chatUnreadCount = {userId : body.userId,
        count : 0}
      await saveUserUnreadCount(body,chatRoom, isNewChat);
     


      console.log("Final Chat Save =>", body.roomId);
      let result = await ChatListModel.updateOne({ roomId: body.roomId }, body);
      return res.status(200).json({
        success: true,
        id: chatRoom._id,
        message: "ChatRoom updated successfully",
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: error.message,
      });
    }
  }
};
