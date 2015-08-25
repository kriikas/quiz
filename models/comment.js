// Definicion del modelo de Commet con validación

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'Comment',
    { texto: {
        type: DataTypes.STRING,
        valiadate: { notEmpty: { msg: "-> Falta Comentario"}}
      }
    }
  );
}
