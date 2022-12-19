import { StatusCodes } from "http-status-codes";

const NotFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Invalid Request!" });
};
export { NotFound };
