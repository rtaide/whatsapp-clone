const mongoose =require ("mongoose");
const { ChatBody } =require ("./ChatRoomModel");
const Schema = mongoose.Schema;

 const ChatUnreadCount = {
  userId: { type: String, required: true },
  count: { type: Number, required: true }
};

const chatListSchema = new Schema(
  {
    roomId: { type: String, required: false },
    userId: { type: String, required: true },
    chatId: { type: String, required: true },
    chatUnreadCount: { type: [ChatUnreadCount], required: false },
    chat: { type: [ChatBody], required: true }
  },
  { timestamps: true }
);

const ChatListModel = mongoose.model("chatList", chatListSchema);

module.exports = ChatListModel;

