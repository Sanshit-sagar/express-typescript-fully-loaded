import cluster from "cluster";
import os from "os";

export default (callback = null) => {
    const cpus = os.cpus().length;

    if(cluster.isMaster) {
        
    }
}