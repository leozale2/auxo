const Router = require('express').Router;

const router = Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  req.dbs.User.find({},function (err,users) {
    res.send(users);
  })
});

/* GET user by ID. */
router.get('/:id', function (req, res, next) {
  req.dbs.User.findOne({id:req.params.id},function (err,user) {
    res.send(user);
  })
});

module.exports = router;
