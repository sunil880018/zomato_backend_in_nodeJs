import Redis from "ioredis";

const connectWithRedis = () => {
  const REDIS_URL = process.env.REDIS_URL
  return new Redis(REDIS_URL);
};

export { connectWithRedis };
