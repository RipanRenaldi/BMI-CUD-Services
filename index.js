import express from "express";
import dotenv from "dotenv";
import router from "./src/routes/router.js";
import cors from "cors";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
app.use(bodyParser.json('application/json'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors('http://localhost:3001'));
app.use(router);

app.listen( Number(process.env.PORT), () => {
    console.log(`Server Running on PORT ${process.env.PORT}`)
})

