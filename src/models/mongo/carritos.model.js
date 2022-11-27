import { Schema, model } from "mongoose";

const carritoSchema = new Schema(
  {
    products: {
      type: [{ type: Schema.Types.ObjectId, ref: "productos" }],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Carrito = new model("carritos", carritoSchema);

export default Carrito;
