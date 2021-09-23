import jwt from 'jsonwebtoken'


export default async function (ctx, next) {
    let token = ctx.header.authorization.split(' ')[1]
    jwt.verify(token, "blog", (error,decode) => {
        if(error) {
            ctx.body = ctx.res.fail("没有权限")
        }
        console.log(decode)
    })
    await next()
}
