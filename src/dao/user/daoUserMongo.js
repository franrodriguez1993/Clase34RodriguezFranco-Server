import containerMongo from "../../containers/containerMongo.js";
import User from "../../models/mongo/users.model.js";

class daoUserMongo extends containerMongo {
  constructor() {
    super(User);
  }
}
export default daoUserMongo;
