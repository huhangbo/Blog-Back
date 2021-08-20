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
        errorLog: { type: 'file', filename: './logs/error.log' },
        error: {type: "logLevelFilter", level: "error", appender: "errorLog"}
},
    categories: {
        default: {appenders: ["out", "date", "error"], level: "debug"}
}}

export const mysqlConfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'blog',
    timezone: '08:00',
}


