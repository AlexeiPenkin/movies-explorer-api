const rateLimit = require('express-rate-limit');
const API_REQUEST_LIMIT_ERRROR = require('../errors/api-request-limit-error');

const apiRequestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
  handler: function (req, res) {
    return res.status(API_REQUEST_LIMIT_ERRROR).json({
      error: 'Вы отправили слишком много запросов. Пожалуйста, подождите немного, а затем повторите попытку.'
    })
}
});

module.exports = { apiRequestLimiter };
