const express =require("express");
const chatRouter = require("./router/chatRouter");
const roomRouter = require("./router/roomRouter");
const userRouter = require( "./router/userRouter");
const statusRouter = require ("./router/statusRouter");
const mongoose = require ("mongoose");
const db = require ("./db/index");
const { saveUserLastSeen } = require ("./controller/lastSeenController");
const config = require  ("config");
const cors = require ("cors");
const path = require  ("path");

// Express setup -----
const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/room", roomRouter);
app.use("/api/status", statusRouter);

const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb+srv://rachit:risertechub@cluster0.qjs8s.mongodb.net/test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Db connected');
  })
  .catch((e) => {
    console.log(e, 'Failed to connect Db');
  });

//use config module to get the privatekey, if no private key set, end the application
if (!config.get("privateKey")) {
  console.error("FATAL ERROR: privateKey is not defined.");
  process.exit(1);
}

app.get("/ping", (req, res) => {
  res.send("pong");
});

// MongoDb setup -----
/*db.on("error", (error) => {
  console.log("Mongoose Connection Error : " + JSON.stringify(error));
});*/

// Socket.io setup -----
const server = require("http").createServer(app);
server.listen(port, () => {
  console.log(`Socket is listening on port ${port}`);
});

const socket = require("socket.io").listen(server);
socket.on("connection", (socketConnection) => {
  console.log("Socket.io connected");

  socketConnection.on("CHAT_LIST", (msg) => {
    // console.log("CHAT_LIST == ", msg);

    // Save User unread count to Chat List table
    // saveUserUnreadCount(msg);

    socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("CHAT_ROOM", (msg) => {
    // console.log("CHAT_ROOM == ", msg);
    socket.emit("CHAT_ROOM", msg);
    // socket.emit("CHAT_LIST", msg);
  });

  socketConnection.on("SCAN_QR_CODE", (msg) => {
    console.log("SCAN_QR_CODE == ", msg);
    socket.emit("SCAN_QR_CODE", msg);
  });

  socketConnection.on("LAST_SEEN", (msg) => {
    // console.log("LAST_SEEN == ", msg);

    // Save User Last seen to Chat Room table
    saveUserLastSeen(msg);

    socket.emit("LAST_SEEN", msg);
  });

  socketConnection.on("USER_STATUS", (msg) => {
    console.log("USER_STATUS == ", msg);
    socket.emit("USER_STATUS", msg);
  });
});

module.exports = app;
