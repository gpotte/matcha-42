router.get('/tchat', middleware.loggedIn(), (req, res)=>{
  res.render('message/tchat', {title: 'messages', user: req.cookies.user});
});

module.exports = router;
