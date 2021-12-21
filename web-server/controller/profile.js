const Profile = require("../model/profile");
const LoginUserModel = require("../model/LoginUserModel");
const fileUpload = require("../utils/fileUpload");
const cloudinary = require("cloudinary").v2;

const deletePhotoCloudinary = async (id) => {
  await cloudinary.uploader.destroy(id);
};

const uploadPhotoCloudinary = async (file) => {
  const { public_id, secure_url } = await fileUpload(file);

  return {
    public_id,
    secure_url,
  };
};

// exports.uploadPhoto = async (req, res, next) => {
//   const photo = await uploadPhotoCloudinary(req.file);

//   const profile = await Profile.findOneAndUpdate(
//     { user: req.user.id },
//     { photo },
//     { new: true }
//   );
//   console.log(profile);
//   res.status(200).json({
//     code: 200,
//     success: "OK",
//     message: "Profile photo updated successfully",
//     data: profile,
//   });
// };

exports.deletePhoto = async (req, res, next) => {
  const profile = await Profile.findOne({ user: req.user.id });

  await deletePhotoCloudinary(profile.photo.public_id);
  profile.photo = process.env.DEFAULT_PROFILE_PHOTO;
  await profile.save();

  res.status(200).json({
    code: 200,
    status: "OK",
    message: "Profile photo deleted successfully",
    data: profile,
  });
};

// exports.updateProfile = async (res, req) => {
//   try {
//     const id = req.user.id;
//     console.log(id, "00000000000000000000000000000");
//     //   const updatedProfile = await Profile.findOneAndUpdate(
//     //     { user: req.user.id },
//     //     req.body//name & about
//     /*{
//       new: true,
//       runValidators: true,
//     }*/
//     //);
//     // return res.status(200).json({
//     //   code: 200,
//     //   status: "OK",
//     //   message: "Profile updated successfully",
//     //   data: {
//     //     profile: updatedProfile,
//     //   },
//     // });
//   } catch (err) {
//     console.log("err");
//   }
// };
