import chalk from 'chalk'

class Logger {
    isErrorObject(value: any): boolean {
      return value && value instanceof Error;
    }
  
    getErrorMessage(value: any) {
      const isErrorObject: boolean = this.isErrorObject(value);
  
      if (isErrorObject) {
        return value?.message || value?.reason || value;
      }
  
      return value;
    }
  
    log(message = "") {
      if (message) {
        console.log(`${message}`);
      }
    }
  
    info(message: string) {
      this.log(chalk.blue(this.getErrorMessage(message)));
      this.externalHandler(message);
    }
  
    success(message: string) {
      this.log(chalk.green(this.getErrorMessage(message)));
      this.externalHandler(message);
    }
  
    warn(message: string) {
      this.log(chalk.yellow(this.getErrorMessage(message)));
      this.externalHandler(message);
    }
  
    error(message: string, error: Error) {
      this.log(chalk.red(this.getErrorMessage(error)));
      this.externalHandler(error);
    }
  
    externalHandler(message: Error | string) {
      // NOTE: Implement calls to third-party logging services here.
    }
}
 
export default new Logger();