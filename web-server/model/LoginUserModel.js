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


const options = {
  expiresIn: "1h",
};

loginUserSchema.methods.generateAuthToken = function (userId) {
  return jwt.sign({ id: userId ? userId : this._id }, "mySecret", options);
};

 const LoginUserModel = mongoose.model("loginUser", loginUserSchema);
 
 module.exports = LoginUserModel;
