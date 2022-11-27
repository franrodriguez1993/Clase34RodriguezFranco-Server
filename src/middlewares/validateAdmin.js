const ADMIN = true;

const validateAmdin = (req, res, next) => {
  if (!ADMIN) {
    res.status(401).json({ error: "Usuario no autorizado." });
    return;
  }
  next();
};

export default validateAmdin;
