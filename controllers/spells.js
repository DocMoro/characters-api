const Spell = require('../models/spell');

const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');
const Error403 = require('../errors/error-403');

const { ERR_400, ERR_403, ERR_404 } = require('../utils/constants');

module.exports.getSpells = async (req, res, next) => {
  try {
    const spells = await Spell.find({}).select(['-createdAt']);
    res.send(spells);
  } catch (err) {
    return next(err);
  }
};

module.exports.createSpell = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'Admin') {
      return next(new Error403(ERR_403));
    }
    const spell = await Spell.create(req.body);
    res.send(spell);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new Error400(ERR_400));
    }

    return next(err);
  }
};

module.exports.deleteSpell = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'Admin') {
      return next(new Error403(ERR_403));
    }
    const spell = await Spell.findById(req.params.spellId);

    if (!spell) {
      throw new Error404(ERR_404);
    }
    const spellData = await Spell.findByIdAndRemove(req.params.spellId).select(['-createdAt']);
    res.send(spellData);
  } catch (err) {
    if (err.name === 'CastError') {
      return next(new Error400(ERR_400));
    }

    return next(err);
  }
};

module.exports.updateSpell = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== 'Admin') {
      return next(new Error403(ERR_403));
    }
    const newSpell = await Spell.findByIdAndUpdate(req.params.spellId, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(newSpell);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new Error400(ERR_400));
    }

    return next(err);
  }
};
