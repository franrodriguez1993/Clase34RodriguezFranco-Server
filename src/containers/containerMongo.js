class containerMongo {
  constructor(model) {
    this.model = model;
  }

  //Listar:
  async getAll() {
    try {
      const productList = await this.model.find({});
      return productList;
    } catch (e) {
      console.log(e);
    }
  }

  //Crear
  async save(object) {
    try {
      const resCreate = await this.model.create(object);
      return resCreate;
    } catch (e) {
      console.log(e);
    }
  }
  //Traer por ID:
  async getById(id) {
    try {
      const resFind = await this.model.findOne({ _id: id });
      return resFind;
    } catch (e) {
      console.log(e);
    }
  }
  //Traer por Usuario:
  async getByUser(uid) {
    try {
      const resFind = await this.model.findOne({ user: uid });
      return resFind;
    } catch (e) {
      console.log(e);
    }
  }
  //Actualizar:
  async updateOne(id, object) {
    try {
      const resUpdate = await this.model.findOneAndUpdate({ _id: id }, object);
      return resUpdate;
    } catch (e) {
      console.log(e);
    }
  }
  //Eliminar por ID:
  async deleteById(id) {
    try {
      const resDelete = await this.model.deleteOne({ _id: id });
      return resDelete;
    } catch (e) {
      console.log(e);
    }
  }

  //Borramos el producto de un carrito:
  async selectedDelete(idc, idp) {
    //idc: id del carrito.
    //idp: id del producto.
    try {
      const carrito = await this.getById(idc);
      if (!carrito) throw new Error("No se encontró el carrito");
      const arrayProducts = carrito.products.filter((item) => item._id != idp);
      carrito.products = arrayProducts;
      carrito.save();
      return true;
    } catch (e) {
      console.log(e);
    }
  }
}

export default containerMongo;
