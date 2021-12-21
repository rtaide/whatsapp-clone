const ChatRoomModel = require("../model/ChatRoomModel");
const updateChatList = require("./chatListController");
const clearUserUnreadCount = require("./unreadCountController");
const cloudinary = require("cloudinary").v2;
const fileUpload = require("../utils/fileUpload");

// Fetch User Chat Room Details
exports.getUserChatRoom = async (req, res) => {
  const roomId = req.body.roomId;
  const userId = req.body.userId;
  try {
    // clear the unread count from chat list table
    await clearUserUnreadCount(roomId, userId);

    const chats = await ChatRoomModel.find({ _id: roomId });
    if (!chats) {
      return res.status(400).json({ 
        code:"400",
        status:"Not Found" , 
        message: "Api Failed",
        data:{} 
      });
    }
    return res.status(200).json({ 
      code:"200",
      status:"Ok",
      data: {chats }
    });
  } catch (err) {
    return res.status(401).json({ 
      code:"401",
      status: "Not Found", 
      message: err,
      data:{} });
  }
};

// Create User Chat Room Details
exports.createChatRoom = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      code:"400",
      status: "Not Found",
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
      return res.status(401).json({
        code:"401",
        status: "Not Found",
        message: "Invalid Data",
      });
    }

    console.log("updateChatRoom  => ", body.roomId);

    await ChatRoomModel.find({ userId : body.userId }, async (err, chatRoom) => {
      console.log("CHAT ROOM => ", chatRoom);

      if (err) {
        console.log(err);
        return res.status(400).json({
          code:"400",
          status:"Not Found",
          message: err.message,
          data:{err}
        });
      }


      // Add new message received to Array
      chatRoom[0].chat.push(body.chat[0]);
      console.log(chatRoom[0].chat,"cccccccccccccccccccccccccccc")

      // Save Chat Room messages
      saveRoomAndUpdateChatList(body, res, chatRoom, false);
    });
  } catch (error) {
    return res.status(402).json({
      code:"402",
      status:"Not Found",
      message: error.message,
    });
  }
};

const saveRoomAndUpdateChatList = async (body, res, chatRoom, isNewChat) => {
  try {
    if (isNewChat) {
      await chatRoom.save();
      await ChatRoomModel.updateOne(
        { _id: chatRoom._id },
        {$set : {roomId : chatRoom._id}}
      )
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
    return res.status(403).json({
      code:"403",
      status:"Not Found",
      message: error.message,
      data:{}
    });
  }
};

exports.chatimg = async(req,res)=>{
  const files = req.files;
  console.log(req.files);
  let image = [];
  for (const file of files) {
    const newPath = await fileUpload(file);

    image.push({
      cloudinary_id: newPath.public_id,
      url: newPath.secure_url,
    });
  }

  const post = await ChatRoomModel.findOne({
    user: req.user.id,
    image: image,
    ...req.body,
  });

  res.status(200).json({
    statuscode:200,
    status:"Ok",
    message: "success",
    data:{post}
  });
} 