const mongoose = require('mongoose');

const { ERR_400 } = require('../utils/constants');

const spellSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  higher_level: {
    type: String,
    required: true,
  },
  range: {
    type: Number,
    required: true,
  },
  components: [{
    type: String,
    enum: ['В', 'С', 'М'],
  }],
  material: {
    type: String,
    required: true,
  },
  ritual: {
    type: Boolean,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  concentration: {
    type: Boolean,
    rerequired: true,
  },
  casting_time: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
    validate: {
      validator(v) {
        return v < 10;
      },
      message: ERR_400,
    },
  },
  school: {
    type: String,
    enum: [
      'Воплощение',
      'Вызов',
      'Иллюзия',
      'Некромантия',
      'Ограждение',
      'Очарование',
      'Преобразование',
      'Прорицание',
    ],
  },
  classes: [{
    type: String,
    enum: [
      'Бард',
      'Жрец',
      'Паладин',
      'Следопыт',
      'Чародей',
      'Колдун',
      'Волшебник',
      'Друид',
      'Изобретатель',
    ],
  }],
}, {
  versionKey: false,
});

const Spell = mongoose.model('spell', spellSchema);
module.exports = {
  Spell,
  spellSchema,
};
