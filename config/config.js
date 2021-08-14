import path from "path";

export const serverConfig = {
    port: '3001',
    secret: 'secret',
}

export const logConfig = {
    replaceConsole: true,
    appenders: {
    out: {type: "stdout",  layout: {type: "colored"}},
    date: {type: "dateFile", filename: "logs/date", pattern: "yyyy-MM-dd.log", alwaysIncludePattern: true},
    error: {type: "file", filename:  "logs/error.log"}
},
    categories: {
    default: {appenders: ["out", "date"], level: "all"},
    error: {appenders: ["out", "error"], level: "error"}
}}

export const mysqlConfig = {
    host     : 'localhost',
    port     : '3306',
    user     : 'root',
    password : 'root',
    database : 'blog'
}


