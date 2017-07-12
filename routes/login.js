var express  = require('express'),
    router   = express.Router();

router.get('/', (req, res)=>{
  res.render('login/index.ejs', {title: 'login'});
});


module.exports = router;
