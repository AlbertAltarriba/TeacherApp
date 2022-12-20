"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require('dotenv').config();
console.log('############################# DBCONFIG.J ######################');
//console.log(process.env.HOST)
// const pool = mysql.createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.PORT_MYSQL
// });
const pool = mysql2_1.default.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '1234',
    database: 'Appteachers',
    port: 3306
});
global.db = pool.promise();
