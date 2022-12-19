import { BadRequestError, NotFoundError } from "../errors/index.js";
import { Food } from "../models/foods.js";

const getFoodMenuController = async (req, res) => {
  try {
    const ListOfFoodMenu = await Food.find();
    return res.status(StatusCodes.OK).json({ ListOfFoodMenu: ListOfFoodMenu });
  } catch (err) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ error: getReasonPhrase(StatusCodes.NOT_FOUND) });
  }
};

const getFoodByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      throw new BadRequestError("Please provide id");
    }
    const food = await Food.findById({ _id: id });
    if (!food) {
      throw new NotFoundError("Not Found!");
    }
    return res.status(StatusCodes.OK).json({ food });
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

const getFoodByNameController = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      throw new BadRequestError("Please provide name");
    }
    const foods = await Food.findOne({ name: name });
    if (!foods) {
      throw new NotFoundError("Not Found!");
    }
    return res.status(StatusCodes.OK).json({ foods });
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
  getFoodMenuController,
  getFoodByIdController,
  getFoodByNameController,
};
