const LoginUserModel = require("../model/LoginUserModel");
<<<<<<< Updated upstream
=======
const Profile = require("../model/profile");
>>>>>>> Stashed changes

// User Login
exports.loginUser = async function (req, res) {
  // Check if body is received or not
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      code: "400",
      status: "Not Found",
      data: { message },
    });
  }

  const user = await LoginUserModel.findOne({
    $or: [{ userName: body.userName }, { phoneNumber: body.phoneNumber }],
<<<<<<< Updated upstream

  }));
=======
  });
>>>>>>> Stashed changes

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
      const profile = new Profile({
        name: body.userName,
        phone: body.phoneNumber,
        user: loginUser._id,
      });
      profile.save();
      const token = loginUser.generateAuthToken();
      console.log(token);
      res
        .status(200)
        .header("token", token)
        .json({
          code: "200",
          status: "Ok",
          message: "Login Successfull",
          data: { id: loginUser._id },
        });
    } else {
      console.log("Registered User : ", user.userId);

      // Return already registered users
      const token = loginUser.generateAuthToken(user.userId);
      console.log("AUTH_TOKEN = ", token);
<<<<<<< Updated upstream
      res.status(200).header("token", token).json({
        token: token,
        success: true,
        id: user.userId,
        message: "Registered User",
      });
=======
      res
        .status(201)
        .header("token", token)
        .json({
          code: "201",
          status: "Ok",
          message: "Registered User",
          data: {
            token: token,
            id: user.userId,
          },
        });
>>>>>>> Stashed changes
    }
  } catch (error) {
    return res.status(401).json({
      code: "401",
      status: "Not Found",
      data: { error },
    });
  }
};

// Fetch Main User List
exports.getLoggedInUserList = async function (req, res) {
  try {
    const users = await LoginUserModel.find({});
    if (!users) {
      console.log("something went wrong");
      return res.status(400).json({
        code: "400",
        status: "Not Found",
        message: "Api Failed",
        data: {},
      });
    }
    return res.status(200).json({
      code: "200",
      status: "OK",
      data: { users },
    });
  } catch (err) {
    return res.status(401).json({
      code: "401",
      status: "Not Found",
      message: "something went wrong",
      data: { err },
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id, "iddddddddddd");
    await LoginUserModel.findByIdAndDelete(id);
    await Profile.findOneAndDelete({ user: id });
    return res.status(200).json({
      code: "200",
      status: "OK",
      message: "successfully deleted",
    });
  } catch (err) {
    return res.status(400).json({
      code: "400",
      status: "Not Found",
      data: { error },
    });
    //console.log("err in del acc");
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id;
    console.log(id, "iddddddddddd");
    const updatedProfile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      req.body //name & about
    );
    return res.status(200).json({
      code: "200",
      status: "OK",
      message: "successfully updated",
    });
  } catch (err) {
<<<<<<< Updated upstream
    return res.status(200).json({ success: false, message: { err: err, data: "something went wronf" }, });
  }
}

exports.searchUserByName = async function (req, res) {
  try {
    const username = req.body.username;

    const userProfile = await LoginUserModel.findOne({ userName: username });
    console.log(userProfile);

    if (!userProfile) {

      console.log("User Profile Not Found!");
      
      return res.status(404).json({
        code: 404,
        status: "NOT FOUND",
        message: "User Not Found",
        data: {}
      });
    }

    res.status(200).json({
      code: 200,
      status: "OK",
      message: "User Found",
      data: {
        userProfile
      }
    });

  } catch (err) {
    return res.status(200).json({ success: false, message: { err: err, data: "something went wrong" } });
=======
    return res.status(400).json({
      code: "400",
      status: "Not Found",
      data: { error },
    });
    //console.log("err in del acc");
>>>>>>> Stashed changes
  }
};
