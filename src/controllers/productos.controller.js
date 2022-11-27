import { daoProductos } from "../dao/daoIndex.js";
import { logger } from "../utils/logger.js";
//~~~~~~~~~~Listar todos los productos~~~~~~~~~~~~~~~~
const getAllProducts = async (req, res) => {
  try {
    const productList = await daoProductos.getAll();
    if (productList) {
      return res.json({ status: 200, msg: "OK", data: productList });
    } else {
      throw new Error("No se encontró la lista de productos.");
    }
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

//~~~~~~~~~~Obtener un producto~~~~~~~~~~~~~~~~~~~~~~
const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await daoProductos.getById(id);
    if (product) {
      return res.json({ status: 200, msg: "OK", data: product });
    } else {
      return res.json({ status: 404, msg: "Producto no encontrado" });
    }
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

//~~~~~~~~~~Crear productos~~~~~~~~~~~~~~~~~~~~~~~~~
const createProduct = async (req, res) => {
  const { name, description, code, image, price, stock } = req.body;
  try {
    const newProduct = { name, description, code, image, price, stock };
    await daoProductos.save(newProduct);
    return res.json({ status: 201, msg: "Producto creado con éxito" });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

//~~~~~~Editar un productos~~~~~~~~~~~~~~~~~~~~~~~~~~
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, code, image, price, stock } = req.body;
  try {
    const productUpdated = { name, description, code, image, price, stock };
    await daoProductos.updateOne(id, productUpdated);
    return res.json({ status: 200, msg: "Producto actualizado" });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

//~~~~~~~~~Eliminar un producto~~~~~~~~~~~~~~~~~~~~~~~
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await daoProductos.deleteById(id);
    return res.json({ status: 200, msg: "Producto eliminado" });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};
export {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
