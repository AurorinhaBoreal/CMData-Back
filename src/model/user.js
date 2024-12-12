const {DataTypes, Model} = require('sequelize')
const sequelize = require('../database/database')

class User extends Model {}

User.init({
    userID:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    email:{
        type:DataTypes.STRING(100),
        allowNull: false
    },
    password:{
        type:DataTypes.STRING(100),
        allowNull: false,
    },
    firstName:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    lastName:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    nickname:{
        type:DataTypes.STRING(50),
        allowNull:true
    },
    avatarUrl:{
        type:DataTypes.STRING(255),
        allowNull:false
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }}, 
    {
        sequelize,
        modelName: "tbl_User",
        timestamps: false,
    }
);

module.exports = User;