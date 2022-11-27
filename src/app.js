import express from "express";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
import mongo from "connect-mongo";
import User from "./models/mongo/users.model.js";
import { verified } from "./utils/bcryptHandler.js";
const app = express();
import "dotenv/config";
//~~~~~~~~~IMPORT ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
import productRoutes from "./routes/productos.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import userRouter from "./routes/user.routes.js";
//configuracion mongo:
import dbConnect from "./utils/connectMongo.js";

//~~~~~~~ CONFIGURACIÓN CORS ~~~~~~~~~~~~~~~~~~
const whiteList = ["https://codertprodriguezweb.onrender.com"];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }
    if (whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
app.use(cors(corsOptions));
//para mongo-atlas-session:
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const mongoStore = mongo.create({
  mongoUrl: process.env.URI_MONGO,
  mongoOptions: advancedOptions,
  ttl: 600,
});

const LocalStrategy = Strategy;
/*----------- Session -----------*/
app.use(
  session({
    store: mongoStore,
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(async function (username, password, done) {
    //Chequear usuario:
    User.findOne({ email: username }, async (err, user) => {
      if (err) throw err;
      if (!user) return done(null, false);
      const checkPass = await verified(password, user.password);
      if (!checkPass) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

//Serialize :
passport.serializeUser((user, done) => {
  done(null, { id: user._id });
});

passport.deserializeUser(async (data, done) => {
  const user = await User.findOne({ _id: data.id });
  if (!user) done(null, false);
  return done(null, user);
});

//Si el storage está configurado para mongo conectamos la db:
if (process.env.STORAGE === "mongo") {
  dbConnect().then(() => console.log("Conectado a la db."));
}

app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static("images"));
app.use(express.urlencoded({ extended: true }));

//~~~~~~~~~~~~~~~ROUTES~~~~~~~~~~~~~~~~~~~~~~~~
app.use("/api/productos", productRoutes);
app.use("/api/carrito", carritoRoutes);
app.use("/api/user", userRouter);
export default app;
