 const  LoginUserModel  = require("../model/LoginUserModel");

// User Login
exports.loginUser =  async function (req, res) {
  // Check if body is received or not
  const body = req.body;
  if (!body) {
    return res.status(200).json({
      success: false,
      message: "Login Failed",
    });
  }

  const user = (await LoginUserModel.findOne({
    $or: [{ userName: body.userName }, { phoneNumber: body.phoneNumber }],
    
  }));

  try {
    const loginUser = new LoginUserModel(body);
    console.log("Login User => ", user);
    // Create New User
    if (user === null) {
      await loginUser.save();

      // Update User ID as mongodb row ID
      await LoginUserModel.updateOne(
        { userName: body.userName },
        { $set: { userId: loginUser._id } }
      );

      const token = loginUser.generateAuthToken();
      console.log(token);
      res.status(200).header("token", token).json({
        success: true,
        id: loginUser._id,
        message: "Login Successfull",
      });
    } else {
      console.log("Registered User : ", user.userId);

      // Return already registered users
      const token = loginUser.generateAuthToken(user.userId);
      console.log("AUTH_TOKEN = ", token);
      res.status(200).header("token", token).json({
        token:token,
        success: true,
        id: user.userId,
        message: "Registered User",
      });
    }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: error.message,
    });
  }
}

// Fetch Main User List
exports.getLoggedInUserList =  async function(req, res) {
  try {
    const users = await LoginUserModel.find({});
    if (!users) {
      console.log('something went wrong')
      return res.status(200).json({ success: false, message: "Api Failed" });
    }
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    return res.status(200).json({ success: false, message: {err: err, data : "something went wronf"}, });
  }
}
