import Food from "../models/foods.js";

const getFoodMenu = async (req, res) => {
  try {
    const foodMenu = await Food.find();
    return res.status(StatusCodes.OK).json({ foodMenu: foodMenu });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getFoodById = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findOne({ _id: id });
    if (!food) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ food: food });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

export { getFoodMenu, getFoodById };
