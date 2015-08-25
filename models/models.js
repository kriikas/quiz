var path = require('path');

var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name   = (url[6] || null);
var user      = (url[2] || null);
var pwd       = (url[3] || null);
var protocol  = (url[1] || null);
var dialect   = (url[1] || null);
var port      = (url[5] || null);
var host      = (url[4] || null);
var storage   = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
//var sequelize = new Sequelize(null, null, null, {dialect: "sqlite", storage: "quiz.sqlite"});

//usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    storage:  storage,
    omitNull: true
  }
);

//Importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
//Importa definicion de la tabla Comment
var Comment = sequelize.import(path.join(__dirname,'comment'));

//Relaciones
//Relacion 1 comentario pertenece a 1 pregunta
Comment.belongsTo(Quiz);
//Relacion 1 pregunta puede tener N comentarios
Quiz.hasMany(Comment);

exports.Quiz = Quiz;//exporta la definicion de la tabla Quiz
exports.Comment = Comment; //exporta la definicion de la tabla Comment

//sequelize.sycn() crea e inicializa tabla de preguntajs en DB
sequelize.sync().then(function () {
  // success(...) ejecuta el manajador una vez creada la tabla
  Quiz.count().then(function (count) {
    if(count === 0){ // la tabla se inicializa solo si esta vacia
      Quiz.create({ pregunta: 'Capital de Italia',
                    respuesta: 'Roma',
                    tema: 'Humanidades'
                  });
      Quiz.create({ pregunta: 'Capital de Portugal',
                    respuesta: 'Lisboa',
                    tema: 'Humanidades'
                  })
      .then(function () {console.log('Base de datos inicializada')});
    };
  });
});
