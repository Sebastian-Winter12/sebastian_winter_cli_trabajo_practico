import mysql from "mysql2/promise";

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "sebastian_winter_cli_trabajo_practico",
    waitForConnections: true,
    connectionLimit: 10
})

export { db }