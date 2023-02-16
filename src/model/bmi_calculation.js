import db from '../../config/db.js';
import { DataTypes } from 'sequelize'
const BMI = db.define('bmi', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: `bmi-${+new Date()}`
    },
    tinggi_badan: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    berat_badan: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    bmi: {
        type: DataTypes.FLOAT,
        allowNull:false
    }

}, { freezeTableName:true, timestamps:false })
export default BMI;