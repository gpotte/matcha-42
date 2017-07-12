var express  = require('express'),
    router   = express.Router();

router.get('/new', (req, res)=>{
  res.render('user/new', {title: 'signin'});
});

module.exports = router;
