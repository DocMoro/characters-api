const Spell = require('../models/spell');

const { ERR_400, ERR_403, ERR_404 } = require('../utils/constants');

module.exports.getSpells = (req, res, next) => {
  Spell.find({}).select(['-createdAt'])
    .then((spells) => res.send(spells))
    .catch(next);
};

module.exports.createSpell = (req, res, next) => {
  Spell.create(req.body)
    .then((spell) => res.send(spell))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400(ERR_400));
      }

      return next(err);
    });
};

module.exports.deleteSpell = (req, res, next) => {
  Spell.findById(req.params.spellId)
    .then((spell) => {
      if (!spell) {
        throw new Error404(ERR_404);
      }

      if (spell.owner.toString() !== req.user._id) {
        throw new Error403(ERR_403);
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
};

module.exports.updateSpell = (req, res, next) => {
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
};
