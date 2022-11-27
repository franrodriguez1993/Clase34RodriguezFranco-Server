import passport from "passport";
import { daoUser } from "../dao/daoIndex.js";
import User from "../models/mongo/users.model.js";
import { encrypt } from "../utils/bcryptHandler.js";
import { transporter } from "../helpers/transport.js";
import { logger } from "../utils/logger.js";
/**======================================================================================**/
/** ========================= REGISTER =========================**/
const registerUser = async (req, res) => {
  try {
    const { nombre, apellido, email, edad, password, telefono, direccion } =
      req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({ status: 400, msg: "USER_ALREADY_CREATED" });
    const hashpass = await encrypt(password);
    const body = {
      nombre,
      apellido,
      email,
      edad,
      password: hashpass,
      telefono,
      direccion,
    };
    const user = await daoUser.save(body);

    if (!user) return res.json({ status: 400, msg: "ERROR_REGISTER" });
    //MAIL AL ADMINISTRADOR:
    const mailOptions = {
      from: "Server <noreply@node.com>",
      to: `${process.env.EMAIL}`,
      subject: "Nuevo registro",
      text: `NUEVO USUARIO: ${user.email} - ${user.nombre} ${user.apellido} | Direccion: ${user.direccion} | Teléfono: ${user.telefono}`,
    };
    transporter.sendMail(mailOptions);
    return res.json({ status: 201, msg: "USER_REGISTERED", data: user });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};

/**======================================================================================**/
/** ========================= LOGIN =========================**/
const loginUser = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      if (!user) return res.json({ status: 400, msg: "ERROR_LOGIN" });
      else {
        req.login(user, (err) => {
          if (err) throw err;
          return res.json({ status: 200, msg: "LOGIN_SUCCESSFULLY" });
        });
      }
    })(req, res, next);
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};
/**======================================================================================**/
/** ========================= DATA =========================**/
const getDataUser = async (req, res) => {
  const user = req.user;
  if (!user) return res.json({ status: 400, msg: "USER_IS_NOT_LOGIN" });
  return res.json({ status: 200, msg: "OK", data: user });
};
/**======================================================================================**/
const logoutUser = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      } else {
        return res.json({ status: 200, msg: "LOGOUT_SUCCESSFULLY" });
      }
    });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};
/**======================================================================================**/
/** ========================= IMAGEN PERFIL =========================**/

const imagenPerfilUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const { file } = req;
    //Chequeamos que el user funcione:
    const user = await User.findOne({ _id: uid });
    if (!user) return res.json({ status: 404, msg: "USER_NOT_FOUND" });

    //Hacemos split del path de la imagen: "/image/nombredelaimagen.jpg"
    user.avatar = `${file.path.split("public")[1]}`;
    const updatedUser = await user.save();
    return res.json({ status: 200, msg: "OK", data: updatedUser });
  } catch (e) {
    logger.warn(e.message);
    return res.json({ status: 500, msg: e.message });
  }
};
export { registerUser, loginUser, getDataUser, logoutUser, imagenPerfilUser };
