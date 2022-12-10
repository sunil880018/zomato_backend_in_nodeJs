import Restaurant from "../models/restaurants.js";

const getRestaurantsController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    return res.status(StatusCodes.OK).json({ restaurants: restaurants });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getRestaurantByLocationController = async (req, res) => {
  const { location } = req.params;
  try {
    const restaurants = await Restaurant.findOne({ location: location });
    if (!restaurants) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ restaurants: restaurants });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getRestaurantByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    const restaurants = await Restaurant.findOne({ name: name });
    if (!restaurants) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ restaurants: restaurants });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

export {
  getRestaurantsController,
  getRestaurantByLocationController,
  getRestaurantByNameController,
};
