const router = require('express').Router();

const { validatorCreateSpell, validatorDeleteSpell, validatorUpdateSpell } = require('../utils/validator');
const {
  getSpells,
  createSpell,
  deleteSpell,
  updateSpell,
} = require('../controllers/spells');

router.get('/', getSpells);
router.post('/', validatorCreateSpell, createSpell);
router.delete('/:movieId', validatorDeleteSpell, deleteSpell);
router.patch('/:movieId', validatorUpdateSpell, updateSpell);

module.exports = router;
