import containerMongo from "../../containers/containerMongo.js";
import Productos from "../../models/mongo/productos.model.js";

class daoProductosMongo extends containerMongo {
  constructor() {
    super(Productos);
  }
}

export default daoProductosMongo;
