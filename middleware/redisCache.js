import { connectWithRedis } from "../database/redis.js";
// Create a Redis instance.
// By default, it will connect to localhost:6379

const getCustomerByIdControllerCache = (req, res, next) => {
  const redis = connectWithRedis()
  const { id } = req.params;
  redis.get(id, (error, customer) => {
    if (error) throw error;
    if (customer !== null) {
      return res.status(StatusCodes.OK).json({ customer: customer });
    } else {
      return next();
    }
  });
};

export { getCustomerByIdControllerCache };
