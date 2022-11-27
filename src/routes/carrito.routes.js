import { Router } from "express";

const routerCart = Router();

//~~~~~~~~~~~~~~~~CONTROLLER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  createCart,
  deleteCart,
  getProductCart,
  addProductCart,
  deleteProductCart,
  getAllCarritos,
  buyProduct,
} from "../controllers/carrito.controller.js";

//~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

routerCart.post("/:uid", createCart);
routerCart.get("/", getAllCarritos);
routerCart.delete("/:id", deleteCart);
routerCart.put("/agregar/:uid/:product", addProductCart);
routerCart.get("/:uid", getProductCart);
routerCart.delete("/eliminar/:uid/:product", deleteProductCart);
routerCart.post("/comprar/:uid", buyProduct);
export default routerCart;
