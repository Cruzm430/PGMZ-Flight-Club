  
const Sequelize = require('sequelize');
module.exports = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/flight_club_db', {logging:false});