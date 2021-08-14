import koaJwt from "koa-jwt";
import jwt from "jsonwebtoken"
import crypto from "crypto"
import {exec} from "../../models/db.js";




export async function login (ctx, next) {
    console.log(ctx.req)
    let {username, password} = ctx.request.body
    const userInfo = await exec(`SELECT user
                                     FROM author
                                     WHERE username = "${username}"
                                     AND password = "${password}"`)
    console.log(userInfo)
    if(userInfo) {
        const token = jwt.sign({name: username, time: new Date().getDay()},"blog", {expiresIn: '1d'})
        ctx.body = ctx.res.success({token: token})
    }
    else {
        ctx.body = ctx.res.fail("用户名或密码错误")
    }
    await next()
}
