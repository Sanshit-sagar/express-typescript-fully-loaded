import cluster from "cluster";
import os from "os";

export default (callback = null) => {
    const cpus = os.cpus().length;

    if(cluster.isPrimary) { // === cluster.isMaster
        for(let i = 0; i < cpus; i++) {
            const worker = cluster.fork();

            worker.on("message", (message) => {
                console.log(`[${worker.process.pid} to MASTER]`)
            })
        }
    }
}