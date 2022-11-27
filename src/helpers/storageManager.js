import fs from "fs";
import path from "path";

//Reemplazo de __dirname:
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class storageManager {
  constructor(archive) {
    this.archive = archive;
  }

  async getAll() {
    try {
      const listObjs = await fs.promises.readFile(
        path.join(__dirname + `/../database/${this.archive}`),
        "utf-8",
        2
      );
      if (listObjs === "") {
        return console.log("La lista de items está vacía");
      } else {
        const listParce = JSON.parse(listObjs);
        return listParce;
      }
    } catch (err) {
      console.log(`Ocurrió el error: ${err}`);
    }
  }

  async save(object) {
    let listObjs = await this.getAll();
    let timestamp = new Date().toDateString();
    let id;
    if (listObjs === undefined) {
      listObjs = [];
      id = 1;
    } else {
      id = listObjs.length + 1;
    }
    const newObject = { ...object, id: id, timestamp: timestamp };
    listObjs.push(newObject);

    try {
      await fs.promises.writeFile(
        path.join(__dirname + `/../database/${this.archive}`),
        JSON.stringify(listObjs, null, 2)
      );
      return console.log(`Se guardó el objeto con el id: ${id}`);
    } catch (err) {
      throw new Error("Error al guardar el objeto en el archivo.");
    }
  }
  async getById(id) {
    const listObjs = await this.getAll();
    let filterProduct = listObjs.filter((item) => item.id == id);
    if (filterProduct.length !== 0) {
      const product = filterProduct[0];
      return product;
    } else {
      return console.log(`No se encontró el objeto con el id ${id}`);
    }
  }
  async updateOne(id, product) {
    let productList = await this.getAll();
    const productListUpdated = productList.map((item) =>
      item.id == id
        ? {
            ...item,
            name: product.name,
            description: product.description,
            image: product.image,
            price: product.price,
            stock: product.stock,
            code: product.code,
          }
        : item
    );
    try {
      await fs.promises.writeFile(
        path.join(__dirname + `/../database/${this.archive}`),
        JSON.stringify(productListUpdated, null, 2)
      );
      return console.log(`Se actualizó el producto con el id: ${id}`);
    } catch (err) {
      throw new Error("Error al actualizar el objeto en el archivo.");
    }
  }
  async deleteById(id) {
    const listObjs = await this.getAll();
    //Comprobamos que exista el producto en el archivo:
    const findObj = listObjs.filter(
      (item) => item.id.toString() === id.toString()
    );
    if (findObj.length === 0) {
      console.log(`No existe el producto con el id ${id}`);
    } else {
      const filterProduct = listObjs.filter(
        (item) => item.id.toString() !== id.toString()
      );
      try {
        await fs.promises.writeFile(
          path.join(__dirname + `/../database/${this.archive}`),
          JSON.stringify(filterProduct, null, 2)
        );
        return console.log(`Se eliminó el objeto con el id: ${id}`);
      } catch (err) {
        throw new Error("Error al eliminar el objeto en el archivo.");
      }
    }
  }
  async postById(idc, object) {
    //idc: id del carrito
    //object: producto a agregar al carrito.
    try {
      //Buscamos el carrito:
      const cartList = await this.getAll();

      const cartFiltered = cartList.filter(
        (item) => item.id.toString() === idc.toString()
      );
      if (!cartFiltered) throw new Error("No se encontró el carrito");
      //Agregamos el producto al carrito:
      const newCart = cartFiltered[0];
      newCart.products.push(object);

      //Incorporamos el carrito a la lista de carritos:
      const cartUpdated = cartList.map((item) =>
        item.id.toString() === idc.toString() ? newCart : item
      );
      //Guardamos en la db:
      await fs.promises.writeFile(
        path.join(__dirname + `/../database/${this.archive}`),
        JSON.stringify(cartUpdated, null, 2)
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
  async selectedDelete(idc, idp) {
    //idc: id del carrito.
    //idp: id del producto.
    try {
      //Traemos todos los carritos:
      const cartList = await this.getAll();
      //Buscamos el que necesitamos:
      const cartFiltered = cartList.filter(
        (item) => item.id.toString() === idc.toString()
      );
      if (!cartFiltered) throw new Error("No se encontró el carrito");

      //Eliminamos el producto del carrito:
      const newCart = cartFiltered[0];
      const arrayProducts = newCart.products.filter(
        (item) => item.id.toString() !== idp.toString()
      );
      newCart.products = arrayProducts;

      //Incorporamos el carrito a la lista de carritos:
      const cartUpdated = cartList.map((item) =>
        item.id.toString() === idc.toString() ? newCart : item
      );

      //Guardamos en la db:
      await fs.promises.writeFile(
        path.join(__dirname + `/../database/${this.archive}`),
        JSON.stringify(cartUpdated, null, 2)
      );
      return true;
    } catch (error) {
      return error.message;
    }
  }
}

export default storageManager;
