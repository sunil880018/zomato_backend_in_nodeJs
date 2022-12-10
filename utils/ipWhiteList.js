// Let us say you have a React frontend and trying to POST a form to your Node backend.
// After you hit that submit button, you will be hit with an error in the console.
// You basically do not have access to that backend, so we will use CORS to enable it.

// whitelisting allows only specific addresses or devices to access data or networks.
// This is usually done by keeping a list of trusted users or devices and only allowing
// traffic from those addresses.

const whitelist = {
  origin: "localhost:3001", // allows localhost:3001 to access localhost:3000 resources
  optionsSuccessStatus: 200,
};

export { whitelist };
