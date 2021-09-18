import  {createConnection} from 'mysql'
import {mysqlConfig} from "../config/config.js";


const connection = createConnection(mysqlConfig)

connection.connect();

//封装执行SQL语句的函数
export function exec (sql) {
    return new Promise((resolve, reject) =>{
        connection.query(sql, (err, res) => {
            if(err){
                reject(err)
            }
            else{
                resolve(res)
            }
        })
    })
}
