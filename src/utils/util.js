import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
export const getTokenFromHeaders = (header) => {
    return header.split(" ")[1]
}

export const compareToken = ( token ) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

export const calculateBmi = (tinggi_badan, berat_badan) => {
    return berat_badan / (tinggi_badan/100) ** 2;
}

export const generateUniqId = ()=>{
    return `bmi-${+new Date()}-${Math.ceil(Math.random()*100)}`;
}
