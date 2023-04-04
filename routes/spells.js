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
router.delete('/:spellId', validatorDeleteSpell, deleteSpell);
router.patch('/:spellId', validatorUpdateSpell, updateSpell);

module.exports = router;
