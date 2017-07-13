router.get('/new', (req, res)=>{
  res.render('user/new', {title: 'signin'});
});

router.post('/new', (req, res)=>{
  var username  = xss(req.body.username),
      mail      = xss(req.body.mail),
      name      = xss(req.body.name),
      firstName = xss(req.body.firstName),
      password  = crypto.createHash('md5').update(req.body.password).digest("hex");

      res.send('success');
});

module.exports = router;
