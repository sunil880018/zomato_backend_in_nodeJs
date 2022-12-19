// JavaScript has a built in error object that provides error information when an error occurs.
// The error object provides two useful properties: name and message.

// name	: Sets or returns an error name
// message: 	Sets or returns an error message (a string)
class CustomAPIError extends Error {
  constructor(message) {
    super(message);
  }
}

export { CustomAPIError };

  // const unauthenticated = new UnauthenticatedError("unauthenticated error");
//   const notFoundError = new NotFoundError("not found error");
//   const badRequestError = new BadRequestError("badRequestError error");
//   const unauthorizedError = new UnauthorizedError("UnauthorizedError error");
//   const errorObj ={
//     unauthenticated,
//     notFoundError,
//     badRequestError,
//     unauthorizedError
//   };
//   res.send(errorObj);


// output
// {"unauthenticated":{"statusCode":401},"notFoundError":{"statusCode":404},"badRequestError":{"statusCode":400},"unauthorizedError":{"statusCode":403}}
