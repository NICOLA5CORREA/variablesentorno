import { DataTypes } from "sequelize";
import db from '../src/utils/database.js';


const User = db.define('users', {
    // definir todos los atributos o columns de la tabla "users"
    id: {
        // tipo de dato
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // username 
    username: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    //email
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
    },
    //password
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }

});

export default User;