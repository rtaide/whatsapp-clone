const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    photo: {
        type: Object,
        default:
          'https://scontent-atl3-1.cdninstagram.com/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=scontent-atl3-1.cdninstagram.com&_nc_ohc=MVEG8QTyVK4AX-E1QAd&oh=a2338939f84d05cff0d598c29ce23a6a&oe=5FB5D50F&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2',
      },
    name: {
        type: String,
      },  
    about: {
      type: String,
      default:"Hey there!",
    },
    phone:{
        type:Number,
    },
    user:{
      type:String
      //type: mongoose.Schema.Types.ObjectId,
      //ref: 'LoginUserModel'
    
    }
  }
);



const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
