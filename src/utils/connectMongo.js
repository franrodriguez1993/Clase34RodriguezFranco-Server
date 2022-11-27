import { connect } from "mongoose";

async function dbConnect() {
  const DB_URI = process.env.URI_MONGO;
  await connect(DB_URI);
}
export default dbConnect;
