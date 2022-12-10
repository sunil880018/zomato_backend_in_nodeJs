// Create the rate limit rule
// A rate limit is the maximum number of api calls you want to allow in a particular time interval.
import { rateLimit } from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
const apiRequestLimiter = rateLimit({
  timeToRemember: 1 * 60 * 1000, // 1 minute
  max: 2, // limit each IP to 2 requests per given time
  message: "You sent too many requests. Please wait a while then try again",
  handler: function (req, res) {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: this.message,
    });
  },
});

export { apiRequestLimiter };
