const { celebrate, Joi } = require('celebrate');

const validatorSignin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validatorSignup = celebrate({
  body: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    role: Joi.string().valid('Admin', 'User'),
  }),
});

const validatorCreateSpell = celebrate({
  body: Joi.object({
    name: Joi.string().required(),
    desc: Joi.string().required(),
    higher_level: Joi.string(),
    range: Joi.number().integer().required(),
    components: Joi.array().unique().items(Joi.string().valid('В', 'С', 'М')).required(),
    material: Joi.string().required(),
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
  }),
});

const validatorDeleteSpell = celebrate({
  params: Joi.object({
    spellId: Joi.string().alphanum().length(24).hex(),
  }),
});

const validatorUpdateSpell = celebrate({
  body: Joi.object({
    name: Joi.string(),
    desc: Joi.string(),
    higher_level: Joi.string(),
    range: Joi.number().integer(),
    components: Joi.array().unique().items(Joi.string().valid('В', 'С', 'М')),
    material: Joi.string(),
    ritual: Joi.bool(),
    duration: Joi.string(),
    concentration: Joi.bool(),
    casting_time: Joi.string(),
    level: Joi.number().integer(),
    school: Joi.string().valid(
      'Воплощение',
      'Вызов',
      'Иллюзия',
      'Некромантия',
      'Ограждение',
      'Очарование',
      'Преобразование',
      'Прорицание',
    ),
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
    )),
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
    spells: Joi.array().unique().items(Joi.string().alphanum().length(24).hex()).required(),
  }),
});

module.exports = {
  validatorSignin,
  validatorSignup,
  validatorCreateSpell,
  validatorDeleteSpell,
  validatorUpdateSpell,
  validatorDeleteCharacter,
  validatorUpdateCharacter,
};
