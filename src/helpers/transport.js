import { createTransport } from "nodemailer";

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const transporter = createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

const mailOptions = {
  from: "Server <noreply@node.com>",
  to: `${EMAIL}`,
  subject: "Carrito",
  text: "",
};
export { transporter };
