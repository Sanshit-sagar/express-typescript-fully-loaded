import logger from './logger'



const handleProcessEvents = () => {
    try {
      process.on("exit", async () => {
        // if () { }
        logger.info("Process exited");
        console.log("Process exited");
      });
  
      process.on("uncaughtException", (error: Error) => {
        logger.error(error);
        console.warn(error);
      });
  
      process.on("uncaughtException", async (error: Error) => {
        logger.error(error);
        console.warn(error);
      });
  
      process.on("unhandledRejection", async (error: Error) => {
        logger.error(error);
        console.warn(error);
      });
    } catch (exception: any) {
        throw new Error(
            `[startup.handleProcessEvents] ${exception.message || exception}`
        );
    }
};

type ErrActionType = { 
    resolve: (value?: unknown) => void;
    reject: (reason?: any) => void;
}

const startup = async (options: any, { resolve, reject }: ErrActionType) => {
    try {
        handleProcessEvents()
        resolve(); 
    } catch (exception: any) {
        reject(`[startup] ${exception.message}`);
    }
}
  
export default (options: any) => {
    new Promise((resolve, reject) => {
        startup(options, { resolve, reject });
    })
}
