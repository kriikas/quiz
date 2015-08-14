var path = require('path');

//Postgres  DATABASE_URL = postgres://user:passwd@host:port/datebase
//SQLite    DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6], null);
var user = (url[2], null);
var pwd = (url[3], null);
var protocol = (url[1], null);
var dialect = (url[1], null);
var port = (url[5], null);
var host = (url[4], null);
var storage = process.env.DATABASE_STORAGE;

//Cargar modelo ORM
var Sequelize = require('sequelize');

//usar BBDD SQLite
var sequelize = new Sequelize(DB_name, user, pwd, {
  dialect: protocol,
  protocol: protocol,
  port: port,
  host: host,
  storage: storage,
  omitNull: true
});

//Importa la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

exports.Quiz = Quiz;//exporta la definicion de la tabla Quiz

//sequelize.sycn() crea e inicializa tabla de preguntajs en DB
sequelize.sync().success(function () {
  // success(...) ejecuta el manajador una vez creada la tabla
  Quiz.count().success(function (count) {
    if(count === 0){ // la tabla se inicializa solo si esta vacia
      Quiz.create({ pregunta: 'Caital de Italia',
                    respuesta: 'Roma'
                  })
      .success(function () {console.log('Base de datos inicializada')});
    };
  });
});
