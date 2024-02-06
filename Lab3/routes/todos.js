const router = require('express').Router();
const TodosController = require('../controllers/todos');

router.get('/', (req, res) => {
  const todos = TodosController.getAll();
  res.json(todos);
});

router.get('/page', (req, res) => {
  res.render('todos', { title: 'New todo!' });
});

router.post('/', (req, res) => {
  TodosController.create(req.body);
  res.sendStatus(204);
});

router.patch('/:id', (req, res) => {
  res.json(req.params);
});

router.use((req, res, next) => {
  console.log('11111111111');
});

module.exports = router;
