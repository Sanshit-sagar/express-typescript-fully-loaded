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

const startup = async (options, { resolve, reject }) => {
    try {
        handleProcessEvents()
        
    } catch (exception) {
        reject(`[startup] ${exception.message}`);
    }
}
  
