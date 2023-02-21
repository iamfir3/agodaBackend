const Sequelize=require('sequelize');

const sequelize=new Sequelize('agodadatabase','root','374gpbttt',{dialect:'mysql',host:'localhost'});

module.exports=sequelize;