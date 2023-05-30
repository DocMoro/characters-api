const router = require('express').Router();

const { validatorCreateOrUpdateSpell, validatorDeleteSpell } = require('../utils/validator');
const {
  getSpells,
  createSpell,
  deleteSpell,
  updateSpell,
} = require('../controllers/spells');

router.get('/', getSpells);
router.post('/', validatorCreateOrUpdateSpell, createSpell);
router.delete('/:spellId', validatorDeleteSpell, deleteSpell);
router.patch('/:spellId', validatorCreateOrUpdateSpell, updateSpell);

module.exports = router;
