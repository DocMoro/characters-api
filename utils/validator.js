const { celebrate, Joi } = require('celebrate');

const validFormSpellObj = {
  name: Joi.string().required(),
  desc: Joi.string().required(),
  higher_level: Joi.string().allow('').required(),
  range: Joi.string().required(),
  components: Joi.array().unique().items(Joi.string().valid('В', 'С', 'М')).required(),
  material: Joi.string().allow('').required(),
  ritual: Joi.bool().required(),
  duration: Joi.string().required(),
  concentration: Joi.bool().required(),
  casting_time: Joi.string().required(),
  level: Joi.number().integer().required(),
  school: Joi.string().valid(
    'Воплощение',
    'Вызов',
    'Иллюзия',
    'Некромантия',
    'Ограждение',
    'Очарование',
    'Преобразование',
    'Прорицание',
  ).required(),
  classes: Joi.array().unique().items(Joi.string().valid(
    'Бард',
    'Жрец',
    'Паладин',
    'Следопыт',
    'Чародей',
    'Колдун',
    'Волшебник',
    'Друид',
    'Изобретатель',
  )).required(),
};

const validSpellObj = {
  _id: Joi.string().alphanum().length(24).hex(),
  ...validFormSpellObj,
};

const validatorSignin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatorSignup = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('Admin', 'User'),
  }),
});

const validatorCreateOrUpdateSpell = celebrate({
  body: Joi.object(validFormSpellObj),
});

const validatorDeleteSpell = celebrate({
  params: Joi.object({
    spellId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatorCreateCharacter = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
  }),
});

const validatorDeleteCharacter = celebrate({
  params: Joi.object({
    charId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatorUpdateCharacter = celebrate({
  params: Joi.object({
    charId: Joi.string().alphanum().length(24).hex(),
  }),
  body: Joi.object({
    name: Joi.string(),
    spells: Joi.array().unique().items(Joi.object(validSpellObj)),
  }),
});

module.exports = {
  validatorSignin,
  validatorSignup,
  validatorCreateOrUpdateSpell,
  validatorDeleteSpell,
  validatorCreateCharacter,
  validatorDeleteCharacter,
  validatorUpdateCharacter,
};
