// const allowedCors = [
//   'https://frontend.movie.project.nomoredomains.xyz',
//   'http://frontend.movie.project.nomoredomains.xyz',
//   'https://backend.movie.project.nomoredomains.xyz',
//   'http://backend.movie.project.nomoredomains.xyz',
//   'http://localhost:3000',
//   'localhost:3000',
// ];

// module.exports.cors = ((req, res, next) => {
//   const { origin } = req.headers;
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     res.header('Access-Control-Allow-Credentials', true);
//   }

//   next();
// });

// Массив доменов, с которых разрешены кросс-доменные запросы
const allowedCors = [
  'https://frontend.movie.project.nomoredomains.xyz',
  'http://frontend.movie.project.nomoredomains.xyz',
  'https://backend.movie.project.nomoredomains.xyz',
  'http://backend.movie.project.nomoredomains.xyz',
  'http://localhost:3000',
  'localhost:3000',
];

module.exports.cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    res.status(200).send();
    return;
  }
  next();
};
