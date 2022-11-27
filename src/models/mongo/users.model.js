import { Schema, model } from "mongoose";

const userSchema = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  telefono: {
    type: Number,
  },
  avatar: {
    type: String,
  },
});

const User = new model("User", userSchema);
export default User;
