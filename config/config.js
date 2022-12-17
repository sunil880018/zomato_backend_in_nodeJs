import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
  REDIS_URL: process.env.REDIS_URL,
  TIME_TO_RATE_LIMITER: process.env.TIME_TO_RATE_LIMITER,
  NO_OF_REQUEST_PER_GIVEN_TIME: process.env.NO_OF_REQUEST_PER_GIVEN_TIME,
};
export { CONFIG };
