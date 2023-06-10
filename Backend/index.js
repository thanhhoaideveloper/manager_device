const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

const HttpException = require('./src/utils/httpException.util')
const combineRoute = require('./src/routes/index.route')

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

combineRoute(app);


// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).send({'message': err.message});
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
