const router = require('express').Router();

const { validatorCreateCharacter, validatorUpdateCharacter, validatorDeleteCharacter } = require('../utils/validator');

const {
  getUserCharacters,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} = require('../controllers/characters');

router.get('/', getUserCharacters);
router.post('/', validatorCreateCharacter, createCharacter);
router.delete('/:charId', validatorDeleteCharacter, deleteCharacter);
router.patch('/:charId', validatorUpdateCharacter, updateCharacter);

module.exports = router;
