import logger from './logger'



const handleProcessEvents = () => {
    try {
      process.on("exit", async () => {
        if (
          
        ) {
          process.mongodb.connection.close();
        }
      });
  
      process.on("uncaughtException", (error) => {
        logger.error(error);
        console.warn(error);
      });
  
      process.on("uncaughtException", async (error) => {
        logger.error(error);
        console.warn(error);
      });
  
      process.on("unhandledRejection", async (error) => {
        logger.error(error);
        console.warn(error);
      });
    } catch (exception) {
      throw new Error(
        `[startup.handleProcessEvents] ${exception.message || exception}`
      );
    }
  };
  
