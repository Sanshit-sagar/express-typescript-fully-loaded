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
    resolve: (reason?: string) => void; 
    reject: (reason?: string) => void; }

const startup = async (options, { resolve, reject }: ErrActionType) => {
    try {
        handleProcessEvents()
        resolve(); 
    } catch (exception: any) {
        reject(`[startup] ${exception.message}`);
    }
}
  
