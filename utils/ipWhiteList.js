// Let us say you have a React frontend and trying to POST a form to your Node backend.
// After you hit that submit button, you will be hit with an error in the console.
// You basically do not have access to that backend, so we will use CORS to enable it.

// whitelisting allows only specific addresses or devices to access data or networks.
// This is usually done by keeping a list of trusted users or devices and only allowing
// traffic from those addresses.
import { StatusCodes } from "http-status-codes";
const whitelist = {
  origin: "localhost:3001", // allows localhost:3001 to access localhost:3000 resources
  optionsSuccessStatus: StatusCodes.OK,
};

export { whitelist };

// CORS stands for Cross-Origin Resource Sharing. It is a security policy that means only resources
// from the same domain, host, and port can interact with the API source. For example, if you try to make
// a fetch request to https://api.yelp.com/v3/businesses/search, you can't retrieve data from localhost:3000.
// Only yelp.com would be able to retrieve data from it's server and any subdomains.

// There are other situations where some applications need to fetch resources from different servers.
// This is where CORS comes into place. It enables other websites to access the servers that
// do not have the same domain, host or port. APIs that have Access-Control-Allow-Origin it
// means we can make fetch requests from any website.
