require("dotenv").config();
const Profile = require("../model/profile");
const LoginUserModel = require("../model/LoginUserModel");
const cloudinary = require("../utils/cloudinary");

exports.uploadProfilePhoto = async (req, res, next) => {
  try {
    const user = await LoginUserModel.findById(req.user.id);
    console.log(user);

    // Upload Profile Image

    const image = await cloudinary.uploader.upload(req.file.path);

    const profile = await Profile.findOneAndUpdate({ user: req.user.id },
      {
        $set: {
          photo: image
        }
      },
      {
        new: true
      }
    );

    console.log(profile);

    res.status(200).json({
      code: 200,
      success: "OK",
      message: "Profile photo uploaded successfully",
      data: profile
    });

  } catch (err) {
    console.log(err);
  }
};

exports.removeProfilePhoto = async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });
  console.log(profile);

  // await deletePhotoCloudinary(profile.photo.public_id);
  await cloudinary.uploader.destroy(profile.photo.public_id);
  profile.photo = process.env.DEFAULT_USER_PROFILE_PHOTO;

  await profile.save();

  console.log(profile);

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Profile photo removed successfully",
    data: profile,
  });
};

exports.updateProfilePhoto = async (req, res, next) => {
  try {
    const user = await LoginUserModel.findById(req.user.id);
    console.log(user);

    // Upload Profile Image

    const image = await cloudinary.uploader.upload(req.file.path);

    const profile = await Profile.findOneAndUpdate({ user: req.user.id },
      {
        $set: {
          photo: image
        }
      },
      {
        new: true
      }
    );

    console.log(profile);

    res.status(200).json({
      code: 200,
      success: "OK",
      message: "Profile photo updated successfully",
      data: profile
    });

  } catch (err) {
    console.log(err);
  }
};

console.log(process.env.DEFAULT_USER_PROFILE_PHOTO);
