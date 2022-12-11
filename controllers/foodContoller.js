import Food from "../models/foods.js";

const getFoodMenuController = async (req, res) => {
  try {
    const foodMenu = await Food.find();
    return res.status(StatusCodes.OK).json({ foodMenu: foodMenu });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getFoodByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const food = await Food.findById({ _id: id });
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

const getFoodByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    const foods = await Food.findOne({ name: name });
    if (!foods) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
    }
    return res.status(StatusCodes.OK).json({ foods: foods });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

export {
  getFoodMenuController,
  getFoodByIdController,
  getFoodByNameController,
};
