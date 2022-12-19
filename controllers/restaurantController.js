import { Restaurant } from "../models/restaurants.js";
import { BadRequestError, NotFoundError } from "../errors/index.js";
const getRestaurantsController = async (req, res) => {
  try {
    const ListOfRestaurant = await Restaurant.find();
    return res.status(StatusCodes.OK).json({ ListOfRestaurant });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getRestaurantByLocationController = async (req, res) => {
  const { location } = req.params;
  try {
    if (!location) {
      throw new BadRequestError("Please provide location");
    }
    const restaurants = await Restaurant.findOne({ location: location });
    if (!restaurants) {
      throw new NotFoundError("Not Found!");
    }
    return res.status(StatusCodes.OK).json({ restaurants });
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

const getRestaurantByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      throw new BadRequestError("Please provide name");
    }
    const restaurants = await Restaurant.findOne({ name: name });
    if (!restaurants) {
      throw new NotFoundError("Not Found!");
    }
    return res.status(StatusCodes.OK).json({ restaurants });
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: error.message, statusCode: error.statusCode });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: error.message, statusCode: error.statusCode });
  }
};

export {
  getRestaurantsController,
  getRestaurantByLocationController,
  getRestaurantByNameController,
};
