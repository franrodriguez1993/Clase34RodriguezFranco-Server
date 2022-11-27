import bcryptjs from "bcryptjs";

//Función para encriptar:
const encrypt = async (pass) => {
  const hassPass = await bcryptjs.hash(pass, 8);
  return hassPass; //retorna la pass hasheada.
};

//Función para comparar:
const verified = async (pass, hassPass) => {
  const isCorrect = await bcryptjs.compare(pass, hassPass);
  return isCorrect; //Retorna un boolean
};

export { encrypt, verified };
