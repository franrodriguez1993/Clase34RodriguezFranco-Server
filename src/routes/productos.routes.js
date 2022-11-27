import { Router } from "express";
const router = Router();
//~~~~~~~~~~~~~~~CONTROLLERS~~~~~~~~~~~~~~~~~~~~~~~~~
import {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productos.controller.js";

//~~~~~~~~~~~~~~~MIDDLEWARES~~~~~~~~~~~~~~~~~~~~~~~~~
import validateAmdin from "../middlewares/validateAdmin.js";

//~~~~~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
router.get("/", getAllProducts);
router.get("/:id", getOneProduct);
router.post("/create", validateAmdin, createProduct);
router.put("/:id", validateAmdin, updateProduct);
router.delete("/:id", validateAmdin, deleteProduct);

export default router;
