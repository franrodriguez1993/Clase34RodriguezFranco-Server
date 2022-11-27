import multer, { diskStorage } from "multer";

//Dirección donde se guardan las imagenes:
const PATH_STORAGE = `${process.cwd()}/public/images`;

//Storage:
const storage = diskStorage({
  //destino de la imagen:
  destination(req, file, cb) {
    cb(null, PATH_STORAGE);
  },
  //Nombre del archivo:
  filename(req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const partialName = file.originalname.split(".").shift();
    const filenameRandom = `image${partialName}${Date.now()}.${ext}`;
    cb(null, filenameRandom);
  },
});
const multerMiddleware = multer({ storage });
export default multerMiddleware;
