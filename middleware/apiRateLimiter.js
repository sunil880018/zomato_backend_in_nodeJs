// Create the rate limit rule
// A rate limit is the maximum number of api calls you want to allow in a particular time interval.
import { rateLimit } from "express-rate-limit";
import { StatusCodes } from "http-status-codes";
import { CONFIG } from "../config/config.js";

const apiRequestLimiter = rateLimit({
  timeToRemember: CONFIG.TIME_TO_RATE_LIMITER, // 1 second
  max: CONFIG.NO_OF_REQUEST_PER_GIVEN_TIME, // limit each IP to 1 requests per given time
  message: "You sent too many requests. Please wait a while then try again",
  handler: function (req, res) {
    return res.status(StatusCodes.TOO_MANY_REQUESTS).json({
      error: this.message,
    });
  },
});

export { apiRequestLimiter };
