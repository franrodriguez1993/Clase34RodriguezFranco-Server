import app from "./app.js";
import minimist from "minimist";
import cluster from "cluster";
import { logger } from "./utils/logger.js";
let options = { alias: { p: "puerto", c: "cluster" } };
let args = minimist(process.argv.slice(2), options);
const CLUSTER = args.c;

const PORT = process.env.PORT || 5000;

//CLUSTERS:
if (CLUSTER) {
  if (cluster.isPrimary) {
    for (let i = 0; i < CPU_CORES; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      logger.info(`Finalizó el worker: ${process.pid}`);
      cluster.fork();
    });
  } else {
    app.listen(PORT, () => {
      logger.info(`App en http://localhost:${PORT}`);
    });
  }
} else {
  app.listen(PORT, () => {
    logger.info(`App en http://localhost:${PORT}`);
  });
}
