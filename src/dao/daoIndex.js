import daoProductosMongo from "./producto/daoProductosMong.js";
import daoCarritoMongo from "./carrito/daoCarritoMong.js";
import daoUserMongo from "./user/daoUserMongo.js";
const daoUser = new daoUserMongo();
const daoCarrito = new daoCarritoMongo();
const daoProductos = new daoProductosMongo();

export { daoProductos, daoCarrito, daoUser };
