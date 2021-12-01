//import { nodeModuleNameResolver } from "typescript";

 class StatusClassModel {
   userId;
  userName;
  lastStatusTime;
  status ;

  constructor(data) {
    this.userId = data.userId;
    this.userName = data.userName;
    this.lastStatusTime = data.lastStatusTime;
    this.status = [new StatusItemModel(data.status[0])];
  }
}

class StatusItemModel {
  image;
  message ;
  seenUsers;
  time;

  constructor(data) {
    this.image = data.image;
    this.message = data.message;
    this.seenUsers = [data.seenUsers[0]];
    this.time = data.time;
  }
}

 class UserModel {
  userId;

  constructor(seenUsers) {
    this.userId = seenUsers.userId;
  }
}

module.exports = {UserModel,StatusItemModel,StatusClassModel}