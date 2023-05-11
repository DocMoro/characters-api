require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { PORT = 3000, MONGO_PORT = 27017, MONGO_IP = 'localhost' } = process.env;

const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const handleError = require('./middlewares/handleError');

const Error404 = require('./errors/error-404');

const { ERR_404 } = require('./utils/constants');

const app = express();

mongoose.connect(`mongodb://${MONGO_IP}:${MONGO_PORT}/bitchardb`, {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(cors);
app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use('/', (req, res, next) => {
  next(new Error404(ERR_404));
});

app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
