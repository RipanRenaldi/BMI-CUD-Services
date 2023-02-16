import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config();


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.HOST,
    dialect:'mysql'
})

db.authenticate()
.then( () => console.log("Connected To Database") )
.catch( () => console.log("Failed to Connected Database") );

export default db;