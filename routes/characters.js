const router = require('express').Router();

const { validatorUpdateCharacter, validatorDeleteCharacter, validatorCreateCharacter } = require('../utils/validator');

const {
  getCharacter,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} = require('../controllers/characters');

router.get('/', getCharacter);
router.post('/', validatorCreateCharacter, createCharacter);
router.delete('/:charId', validatorDeleteCharacter, deleteCharacter);
router.patch('/:charId', validatorUpdateCharacter, updateCharacter);

module.exports = router;