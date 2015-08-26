//MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function (req, res, next) {
  if(req,session.user){//si existe usuario logueado
    next();//ejecuta siguiente MW instalado en la ruta a la que se llama en routes/index.js
  }else{
    res.redirect('/login');
  }
}
//GET /login --formulario login
exports.new = function (req, res) {
  var errors = req.session.errors || {};
  req.session.errors = {};
  res.render('sessions/new', {errors: errors});
};

//POST /login  --Crear la sesion
exports.create = function (req, res) {
  var login     = req.body.login;
  var password  = req.body.password;
  var userController = require('./user_controller');
  userController.autenticar(login, password, function (error, user) {
    if(error){
      req.session.errors = [{"message": 'Se ha producido un error: ' +error}];
      res.redirect("/login");
      return;
    }
    //Crear req.session.user y guarda campos id y username
    //La session se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username:user.username};
    res.redirect(req.session.redir.toString()); //redireccion a path anterior a login
  });
};
exports.destroy = function (req, res) {
  delete req.session.user;
  res.redirect(req.session.redir.toString());
}
