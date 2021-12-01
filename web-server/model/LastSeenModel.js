const mongoose =require ("mongoose");
const Schema = mongoose.Schema;

const lastSeenSchema = new Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    status: { type: String, required: true },
    lastSeen: { type: String, required: true }
  },
  { timestamps: true }
);

const LastSeenModel = mongoose.model("lastSeen", lastSeenSchema);

module.exports = LastSeenModel;

