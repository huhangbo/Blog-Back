import {exec} from "../../models/db.js";
import koaJwt from "koa-jwt";
import jwt from "jsonwebtoken"
import crypto from "crypto"


export async function login (ctx, next) {
    let {user, password} = ctx.request.body
    const userInfo = await exec(`SELECT user
                                     FROM author
                                     WHERE user = "${user}"
                                     AND password = "${password}"`)
    if(userInfo) {
        const token = jwt.sign({name: user, time: new Date().getDay()},"blog", {expiresIn: '1d'})
        ctx.body = ctx.res.success({token: token})
    }
    else {
        ctx.body = ctx.res.fail("用户名或密码错误")
    }
    await next()
}

export async function updateAuthorInfo (ctx, next) {
    let {author_id, name, avatar, tag} = ctx.request.body
    await exec(`UPDATE author
                    SET name = "${name}", avater = "${avatar}", tag = "${tag}"
                    WHERE author_id = ${author_id}`)
    ctx.body = ctx.res.success()
}
