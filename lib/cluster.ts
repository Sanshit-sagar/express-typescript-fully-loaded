import cluster from "cluster";
import os from "os";
import logger from "./logger";

export default (callback: any = null) => {
    const cpus = os.cpus().length;

    if(cluster.isPrimary) { // === cluster.isMaster
        for(let i = 0; i < cpus; i++) {
            const worker = cluster.fork();

            worker.on("message", (message) => {
                logger.info(`[${worker.process.pid} to MASTER]: ${message}`);
            });
        }

        cluster.on("exit", (worker) => {
            logger.warn(`[${worker.process.pid}]: Process terminated. Restarting...`);
            cluster.fork(); 
        }); 
    } else {
        if(callback) {
            callback(); 
        }
    }
}