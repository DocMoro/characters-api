const mongoose = require('mongoose');
const { spellSchema } = require('./spell');

const abilitieSchema = new mongoose.Schema({
  value: {
    type: Number,
    default: 10,
  },
  modifier: {
    type: Number,
    default: 0,
  },
});

const abilitiesSchema = new mongoose.Schema({
  strength: abilitieSchema,
  dexterity: abilitieSchema,
  constitution: abilitieSchema,
  intelligence: abilitieSchema,
  wisdom: abilitieSchema,
  charisma: abilitieSchema,
});

const savingThrowSchema = new mongoose.Schema({
  possession: {
    type: Boolean,
    default: false,
  },
  modifier: {
    type: Number,
    default: 0,
  },
});

const savingThrowsSchema = new mongoose.Schema({
  strength: savingThrowSchema,
  dexterity: savingThrowSchema,
  constitution: savingThrowSchema,
  intelligence: savingThrowSchema,
  wisdom: savingThrowSchema,
  charisma: savingThrowSchema,
});

const skillSchema = new mongoose.Schema({
  possession: {
    type: [Boolean],
    default: [false, false],
  },
  modifier: {
    type: Number,
    default: 0,
  },
});

const skillsSchema = new mongoose.Schema({
  athletics: skillSchema,
  acrobatics: skillSchema,
  sleightOfHand: skillSchema,
  atealth: skillSchema,
  animalHandling: skillSchema,
  insight: skillSchema,
  medicine: skillSchema,
  perception: skillSchema,
  survival: skillSchema,
  deception: skillSchema,
  intimidationL: skillSchema,
  performance: skillSchema,
  persuasion: skillSchema,
});

const deathSavesSchema = new mongoose.Schema({
  successes: {
    type: [Boolean, Boolean, Boolean],
    default: [false, false, false],
  },
  failures: {
    type: [Boolean, Boolean, Boolean],
    default: [false, false, false],
  },
});

const xpSchema = new mongoose.Schema({
  max: Number,
  current: Number,
});

const featureSchema = new mongoose.Schema({
  name: String,
  source: {
    type: String,
    enam: [
      'раса',
      'класс',
      'черта',
      'предыстория',
      'предмет',
      'другое',
    ],
  },
  sourceType: String,
  description: String,
});

const moneySchema = new mongoose.Schema({
  cooper: Number,
  silver: Number,
  electrum: Number,
  gold: Number,
  platinum: Number,
});

const itemSchema = new mongoose.Schema({
  equipped: Boolean,
  count: Number,
  number: String,
  weight: Number,
});

const toolSchema = new mongoose.Schema({
  name: String,
  abilitie: {
    type: String,
    enum: [
      'сила',
      'ловкость',
      'выносливость',
      'интеллект',
      'мудрость',
      'харизма',
    ],
  },
  possession: {
    type: String,
    enum: [
      'владение',
      'компетентность',
    ],
  },
});

const otherSchema = new mongoose.Schema({
  name: String,
  type: String,
});

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lvl: {
    type: Number,
    default: 1,
  },
  inspiration: Boolean,
  xp: xpSchema,
  txp: Number,
  hitDice: Number,
  background: String,
  race: String,
  class: {
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
  },
  aligment: String,
  experiensePoint: String,
  playerName: String,
  dc: {
    type: Number,
    default: 10,
  },
  initiative: Number,
  speed: {
    type: Number,
    default: 30,
  },
  deathSaves: deathSavesSchema,
  abilities: abilitiesSchema,
  skills: skillsSchema,
  savingThrows: savingThrowsSchema,
  personalityTraits: String,
  ideals: String,
  bonds: String,
  flaws: String,
  features: [featureSchema],
  money: moneySchema,
  items: [itemSchema],
  tools: [toolSchema],
  others: [otherSchema],
  spells: [spellSchema],
  owner: {
    type: mongoose.ObjectId,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('character', characterSchema);
