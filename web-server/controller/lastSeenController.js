const  LastSeenModel  = require ("../model/LastSeenModel");

exports.saveUserLastSeen=  async function(body) {
    // Update last seen details against User Id
    let item = await LastSeenModel.updateOne({ userId: body.userId }, body, {
      upsert: true,
    });
  }
  
  exports.getUserLastSeen =  async function (req, res) {
    let paramId = req.body.id;
    // console.log("USER ID => ", paramId);
  
    // Query for the user's last seen
    try {
      const lastSeen = await LastSeenModel.find({ userId: paramId });
      console.log("USER LAST SEEN ==> ", lastSeen);
  
      res.status(200).json({
        code:"200",
        status:"OK",
        data:{lastSeen: lastSeen},
      });
    } catch (error) {
      1;
      return res.status(400).json({
        code:"400",
        status:"Not Found" ,
        message: error.message,
      });
    }
  } 