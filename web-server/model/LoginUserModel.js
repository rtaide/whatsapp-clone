const mongoose = require ("mongoose");
const { ChatBody } = require ("./ChatRoomModel");
const jwt = require  ("jsonwebtoken");
const config = require  ("config");

const Schema = mongoose.Schema;

const loginUserSchema = new Schema(
  {
    userId: { type: String, required: false },
    userName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    numberType: { type: String, required: false },
    country: { type: String, required: false },
  },
  { timestamps: true }
);

loginUserSchema.methods.generateAuthToken = function (userId) {
  return jwt.sign({ id: userId ? userId : this._id }, config.get("privateKey"));
};

 const LoginUserModel = mongoose.model("loginUser", loginUserSchema);
 
 module.exports = LoginUserModel;
