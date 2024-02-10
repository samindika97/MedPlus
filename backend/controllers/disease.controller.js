const mongoose = require("mongoose");

const Disease = require("../models/disease.model");

const responseHandler = require("../utils/response");

exports.addDisease = async (req, res) => {
  var { name, content, symptoms } = req.body;

  var newDisease = {
    name: name.toLowerCase(),
    content: content,
    symptoms: symptoms,
  };

  try {
    await Disease.create(newDisease)
      .then(async (result) => {
        const newDisease = await Disease.findById(result._id).populate({
          path: "symptoms",
          select: "name",
        });
        return responseHandler.success(
          res,
          newDisease,
          "New disease added successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.serverError(res);
  }
};

exports.getDiseases = async (req, res) => {
  try {
    await Disease.find()
      .populate({ path: "symptoms", select: "name" })
      .sort({ _id: -1 })
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Diseases retrieved successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.serverError(res);
  }
};

exports.getDisease = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid disease ID");
  }

  try {
    await Disease.findById(id)
      .populate("symptoms")
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Disease retrieved successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.serverError(res);
  }
};

exports.updateDisease = async (req, res) => {
  const id = req.params.id;
  var { name, content, symptoms } = req.body;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid disease ID");
  }

  const updateDisease = {
    name: name.toLowerCase(),
    content: content,
    symptoms: symptoms,
  };

  try {
    await Disease.findByIdAndUpdate(id, updateDisease, { new: true })
      .populate("symptoms")
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Diseases updated successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.serverError(res);
  }
};

exports.deleteDisease = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    return responseHandler.error(res, "Invalid disease ID");
  }

  try {
    await Disease.findByIdAndDelete(id)
      .then((result) => {
        return responseHandler.success(
          res,
          result,
          "Diseases deleted successfully"
        );
      })
      .catch((error) => {
        return responseHandler.error(res, error);
      });
  } catch (error) {
    return responseHandler.serverError(res);
  }
};
