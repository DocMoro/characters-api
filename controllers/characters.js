const Character = require('../models/character');

const { ERR_403, ERR_404, ERR_400 } = require('../utils/constants');

module.exports.getUserCharacters = (req, res, next) => {
  const { _id } = req.user;

  Character.find({ owner: _id }).select(['-createdAt'])
    .then((char) => res.send(char))
    .catch(next);
};

module.exports.createCharacter = (req, res, next) => {
  const { _id } = req.user;

  Character.create({
    spells: [],
    owner: _id,
  }).then((char) => res.send(char))
    .catch(next);
};

module.exports.deleteCharacter = (req, res, next) => {
  Character.findById(req.params.charId)
    .then((char) => {
      if (!char) {
        throw new Error404(ERR_404);
      }

      if (char.owner.toString() !== req.user._id) {
        throw new Error403(ERR_403);
      }

      return Character.findByIdAndRemove(req.params.charId).select(['-createdAt']);
    })
    .then((char) => res.send(char))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new Error400(ERR_400));
      }

      return next(err);
    });
};

module.exports.updateCharacter = (req, res, next) => {
  User.findByIdAndUpdate(req.params.charId, {
    ...req.body,
  }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new Error400(ERR_400));
      }

      return next(err);
    });
};
