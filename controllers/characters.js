const Character = require('../models/character');

const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');
const Error403 = require('../errors/error-403');

const { ERR_403, ERR_404, ERR_400 } = require('../utils/constants');

module.exports.getUserCharacters = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const char = await Character.find({ owner: _id }).select(['_id', 'name']);
    res.send(char);
  } catch (err) {
    return next(err);
  }
};

module.exports.getCharacter = async (req, res, next) => {
  try {
    const { id } = req.params;
    const char = await Character.findById(id);

    if (!char) {
      throw new Error404(ERR_404);
    }

    res.send(char);
  } catch (err) {
    return next(err);
  }
};

module.exports.createCharacter = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const char = await Character.create({
      name: req.body.name,
      spells: [],
      owner: _id,
    });
    res.send(char);
  } catch (err) {
    return next(err);
  }
};

module.exports.deleteCharacter = async (req, res, next) => {
  try {
    const char = await Character.findById(req.params.charId);

    if (!char) {
      throw new Error404(ERR_404);
    }

    if (char.owner.toString() !== req.user._id) {
      throw new Error403(ERR_403);
    }

    const charData = await Character.findByIdAndRemove(req.params.charId).select(['-createdAt']);
    res.send(charData);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new Error400(ERR_400));
    }
    return next(err);
  }
};

module.exports.updateCharacter = async (req, res, next) => {
  try {
    const newChar = await Character.findByIdAndUpdate(req.params.charId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(newChar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new Error400(ERR_400));
    }
    return next(err);
  }
};
