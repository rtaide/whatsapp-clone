const  StatusModel  = require ("../model/StatusModel");
const moment = require ("moment");

exports.getAllUserStatus= async (req, res) =>{
  let paramId = req.user.id;
  // console.log("USER ID => ", paramId);
  try {
    const status = await StatusModel.find({});
    res.status(200).json({
      code:"200",
      status:"OK",
      data:{status: status},
    });
  } catch (error) {
    1;
    return res.status(400).json({
      code:"400",
      status:"Not Found",
      message: error.message,
      data:{}
    });
  }
}

exports.createUserStatus=  async (req, res) =>{
  try {
    const body = req.body;
    if (!body) {
      return res.status(400).json({
        code:"400",
        status: "Not Found",
        message: "Invalid Data",
        data:{}
      });
    }
    const statusModel = new StatusModel(body);
    console.log("STATUS Update  => ", JSON.stringify(statusModel));
    if (!statusModel) {
      return res.status(401).json({
        code:"401",
        status:"Not Found",
        message: "Invalid Data",
        data:{}
      });
    }

    var statusItem = (await StatusModel.findOne({
      userId: statusModel.userId,
    })) ;

    // If Already exists
    if (statusItem) {
      // const statusData = statusModel.status[0]
      //   statusItem.status[0].seenUsers.push(statusModel.status[0].seenUsers);
      // Add new status received to Array
      statusItem.lastStatusTime = moment().format();
      statusItem.status.push(statusModel.status[0]);
    } else {
      statusItem = statusModel;
      statusItem.lastStatusTime = moment().format();
    }

    console.log("Final STATUS  => ", JSON.stringify(statusItem));

    // Create/Update Status
    const insert = await StatusModel.updateOne(
      { userId: body.userId },
      statusItem,
      {
        upsert: true,
      }
    );
    console.log("Status Server Response : ", insert);
    return res.status(200).json({
      code:"200",
      status:"Ok",
      message: "Status created successfully",
      data:{insert}
    });
  } catch (error) {
    console.log(error);
    return res.status(402).json({
      code:"402",
      status:"Not Found",
      message: error.message,
    });
  }
}

exports.setUserStatusViewed= async function (req, res) {
  let body = req.body;
  console.log("Status  => ", body);
  try {
    const statusItem = (await StatusModel.findOne({
      userId: body.userId,
    }));
    console.log("Status Found => ", statusItem);
    for (let i = 0; i < statusItem.status.length; i++) {
      if (statusItem.status[i]._id == body.statusId) {
        const row = statusItem.status[i].seenUsers.indexOf(body.loginId);
        console.log('INDEX ; ',row);
        //console.log(body.loginId,"aaaaaa")
        if (row !== -1) {
          statusItem.status[i].seenUsers.splice(row, 1, body.loginId);
        } else {
          statusItem.status[i].seenUsers.push(body.loginId);
        }

        // var isMatch = false;
        // for (let m = 0; m < statusItem.status[i].seenUsers.length; m++) {
        //   const element = statusItem.status[i].seenUsers[m];
        //   if (element == body.userId) {
        //     statusItem.status[i].seenUsers.splice(1, m, body.userId);
        //     isMatch = true;
        //     break
        //   }
        // }

        // if (!isMatch) {
        //   statusItem.status[i].seenUsers.push(body.userId);
        // }
        break;
      }
    }
    // console.log("Status Viewed => ", statusItem);

    await StatusModel.updateOne({ userId: body.userId }, statusItem, {
      upsert: true,
    });
    res.status(200).json({
      code:"200",
      status:"Ok",
      message: "Status updated successfully",
      data:{}
    });
  } catch (error) {
    1;
    return res.status(400).json({
      code:"400",
      status:"Not FOund",
      message: error.message
    });
  }
}
