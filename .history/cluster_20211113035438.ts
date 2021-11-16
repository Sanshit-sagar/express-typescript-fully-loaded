import cluster from "cluster";
import os from "os";

export default (callback = null) => {
    const cpus = os.cpus().length;

    if(cluster.isPrimary) { // 
        for(let i = 0; i < cpus; i++) {
            const worker = cluster.fork();


        }
    }
}