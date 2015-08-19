var models = require('../models/models.js');

//Autoload - facotriza el codigo si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function (quiz) {
      if(quiz){
        req.quiz = quiz;
        next();
      }else{ next(new Error('No existe quizId=' + quizId));}
    }
  ).catch(function () {
    next(error);
  });
};

//GET /quizes
exports.index = function (req, res, next) {
  models.Quiz.findAll().then(function(quizes) {
    if(req.query.search){
      for(var i = 0; i < quizes.length; i++){
        //console.log(quizes[i].pregunta.toLowerCase().match(req.query.search.toLowerCase()));
        if(!quizes[i].pregunta.toLowerCase().match(req.query.search.toLowerCase())){
          quizes.splice(i--,1);
        }
      }
    }
    res.render('quizes/index', { quizes: quizes});
  }).catch(function (error) { next(error);});
};

//GET /quizes/:id
exports.show = function (req, res) {
  models.Quiz.find(req.params.quizId).then(function (quiz) {
      res.render('quizes/show', { quiz: req.quiz});
  })
};

//GET /quizes/:id/answer
exports.answer = function (req, res) {
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta){
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};
exports.author = function (req, res) {
  res.render('author');
}
