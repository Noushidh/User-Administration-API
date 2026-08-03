import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectMongoDB } from "./infrastructure/database/mongodb/connection";
import { connectPostgres } from "./infrastructure/database/postgresql/connection";


const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectMongoDB();
    await connectPostgres();

    app.listen(PORT, () => {
      console.log(`server running on  http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
