import winston from 'winston';
import "winston-mongodb";
import "express-async-errors";
 
 const logger = winston.createLogger({
   
    level: 'info',
    defaultMeta: { service: 'user-service' },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
    transports: [
      new winston.transports.MongoDB({ db:"mongodb://localhost/moneyappblogs"}),
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'logging.log' , level: 'info' }),
    ],
  });
   

  logger.log('info', 'Log in successfull');
export default logger;