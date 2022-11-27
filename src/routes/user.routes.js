import { Router } from "express";
const userRouter = Router();
import {
  registerUser,
  loginUser,
  getDataUser,
  logoutUser,
  imagenPerfilUser,
} from "../controllers/user.controller.js";
import multerMiddleware from "../middlewares/multerMiddleware.js";

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logindata", getDataUser);
userRouter.post("/logout", logoutUser);
userRouter.put(
  "/avatar/:uid",
  multerMiddleware.single("avatar"),
  imagenPerfilUser
);

export default userRouter;
