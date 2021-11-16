const Sequelize = require('sequelize')


//conectando ao banco
const sequelize = new Sequelize('sistemadecadastro', 'root', 'thiagod777', {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}