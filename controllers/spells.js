const Spell = require('../models/spell');

const Error404 = require('../errors/error-404');
const Error400 = require('../errors/error-400');
const Error403 = require('../errors/error-403');

const { ERR_400, ERR_403, ERR_404 } = require('../utils/constants');

module.exports.getSpells = (req, res, next) => {
  Spell.find({}).select(['-createdAt'])
    .then((spells) => res.send(spells))
    .catch(next);
};

module.exports.createSpell = (req, res, next) => {
  const { role } = req.user;

  if (role === 'Admin') {
    Spell.create(req.body)
      .then((spell) => res.send(spell))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new Error400(ERR_400));
        }

        return next(err);
      });
  }
  return next(new Error403(ERR_403));
};

module.exports.deleteSpell = (req, res, next) => {
  const { role } = req.user;

  if (role === 'Admin') {
    Spell.findById(req.params.spellId)
      .then((spell) => {
        if (!spell) {
          throw new Error404(ERR_404);
        }

        return Spell.findByIdAndRemove(req.params.spellId).select(['-createdAt']);
      })
      .then((spell) => res.send(spell))
      .catch((err) => {
        if (err.name === 'CastError') {
          return next(new Error400(ERR_400));
        }

        return next(err);
      });
  }
  return next(new Error403(ERR_403));
};

module.exports.updateSpell = (req, res, next) => {
  const { role } = req.user;

  if (role === 'Admin') {
    Spell.findByIdAndUpdate(req.params.spellId, req.body, {
      new: true,
      runValidators: true,
    })
      .then((spell) => res.send(spell))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          return next(new Error400(ERR_400));
        }

        return next(err);
      });
  }
  return next(new Error403(ERR_403));
};
