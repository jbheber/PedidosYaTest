import { ServerApp } from "./serverApp";
import { logger, initializeLogger } from './config/loggerConfig';
import * as appConfig from "./config/appConfig";

//Create logs file
initializeLogger();

//Register error into logs
process.on('uncaughtException', function (err) {
  logger.error(err.message);
});
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: ' + p + ' reason: ' + reason);
});
process.on('warning', (warning) => {
  logger.info("Warning Name: " + warning.name + ", Message: " + warning.message);
});

let serverApp = new ServerApp();
serverApp.startServer(appConfig.listeningPort);
