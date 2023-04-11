const router = require('express').Router();

const { validatorUpdateCharacter, validatorDeleteCharacter } = require('../utils/validator');

const {
  getCharacter,
  getUserCharacters,
  createCharacter,
  deleteCharacter,
  updateCharacter,
} = require('../controllers/characters');

router.get('/', getUserCharacters);
router.post('/', createCharacter);
router.get('/:id', getCharacter);
router.delete('/:charId', validatorDeleteCharacter, deleteCharacter);
router.patch('/:charId', validatorUpdateCharacter, updateCharacter);

module.exports = router;
