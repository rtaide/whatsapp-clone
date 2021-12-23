const cloudinary = require('cloudinary').v2;

const cloudinaryConfig = () => {
  cloudinary.config({
    cloud_name: "rachit551832",
    api_key: "137177449377729",
    api_secret: "8BhbY0x_eqTWoQ7q7DtuCNNi0Vw",
  });
};

module.exports = cloudinaryConfig;
