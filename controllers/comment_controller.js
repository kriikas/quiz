var models = require('../models/models.js');

//GET /quizes/:quizId/comments/new
exports.new = function (req, res) {
  res.render('comments/new.ejs', {quiz: req.params.quizId});
};

//POST /quizes/:quizId/comments
exports.create = function (req, res) {
  /*
  var Comment = {
    texto: req.body.comment.texto,
    QuizId: req.params.quizId
  }
  var comment = models.Comment.build(Comment);
  */
  var comment = models.Comment.build(
    { texto: req.body.comment.texto,
      QuizId: req.params.quizId
    }
  );
  comment.validate().then(
    function (err) {
      if(err){
        res.render('comments/new.ejs', {comment: comment, errors: err.errors});
      }else{
        comment.save().then(
          function () {
            res.redirect('/quizes/'+req.params.quizId)
          }
        );
      }
    }
  );
}
