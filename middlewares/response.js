import {logger} from "./logger.js"

export const response = (option = {}) => {
    return async (ctx, next) => {
        ctx.res.fail = (data = "请求失败", code = 400, message = "fail") => {
            return {
                code,
                message,
                data
            }
        }
        ctx.res.success = (data = "请求成功", type = "json") => {
            ctx.type = type || option.type
            return{
                code: 200,
                message: "success",
                data: data,
            }
        }
        await next()
    }
}

export const error = () => {
    return async (ctx, next) => {
        await next().catch(err => {
            logger.error(err)
            console.log(err)
            if (err.code) {
                ctx.body = ctx.res.fail();
            } else {
                ctx.app.emit('error', err, ctx);
            }
        })
    };
};
