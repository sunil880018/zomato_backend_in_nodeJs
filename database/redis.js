import Redis from "ioredis";
import {CONFIG} from "../config/config.js"
const connectWithRedis = () => {
  const REDIS_URL = CONFIG.REDIS_URL;
  return new Redis(REDIS_URL);
};

export { connectWithRedis };
