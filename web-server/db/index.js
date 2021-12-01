const mongoose = require ("mongoose");

// const DATABASE_CONNECTION_STRING = 'mongodb://127.0.0.1:27017/WhatsappClone'
const DATABASE_CONNECTION_STRING =
  "mongodb+srv://sachin:sachin123@cluster0.zexxw.mongodb.net/test";

mongoose
  .connect(DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log("Mongoose Error 2 : " + JSON.stringify(err));
  });

//exports.mongoose.connection;
