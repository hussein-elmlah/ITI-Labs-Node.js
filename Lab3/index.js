const express = require('express');
const router = require('./routes/todos');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.set('view engine', 'pug');

app.use(express.json());
app.use((req, res, next) => {
  console.log('Request received');
  next();
});

app.use('/todos', router);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
