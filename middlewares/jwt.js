import koaJwt from 'koa-jwt'
import jwt from 'jsonwebtoken'


export default async function (ctx, next) {
    try {
        if(typeof ctx.request.headers.authorization === 'string') {
            const token = ctx.request.headers.authorization.slice(7)
            ctx.jwtData = jwt.verify(token, "blog")
        } else {
            throw {code: 401, message: 'no authorization'}
        }
    } catch (err) {
        throw {code: 401, message: err.message}
    }
    await next()
}
