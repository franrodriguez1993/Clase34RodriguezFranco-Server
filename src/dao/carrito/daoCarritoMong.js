import containerMongo from "../../containers/containerMongo.js";
import Carrito from "../../models/mongo/carritos.model.js";

class daoCarritoMongo extends containerMongo {
  constructor() {
    super(Carrito);
  }
  async getProductCart(uid) {
    try {
      const carrito = await Carrito.findOne({ user: uid }).populate("products");
      if (!carrito) throw new Error("Carrito no encontrado");
      return carrito;
    } catch (e) {
      console.log(e);
    }
  }
  async deleteProductCart(uid, product) {
    try {
      const carrito = await Carrito.findOne({ user: uid }).populate("products");
      if (!carrito) throw new Error("Carrito no encontrado");
      const newCarrito = carrito.products.filter(
        (p) => p._id.toString() !== product.toString()
      );
      carrito.products = newCarrito;
      return await carrito.save();
    } catch (e) {
      console.log(e);
    }
  }
}

export default daoCarritoMongo;
