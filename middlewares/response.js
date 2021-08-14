import {errLogger} from "./logger.js"

export const response = (option = {}) => {
    return async (ctx, next) => {
        ctx.res.fail = (data, code = 400, message = "fail") => {
            return {
                code,
                message,
                data
            }
        }
        ctx.res.success = (data, type) => {
            ctx.type = type || option.type || 'json'
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
        try {
            await next();
            if (ctx.status === 200) {
                ctx.res.success();
            }
        } catch (err) {
            errLogger.error(err)
            if (err.code) {
                ctx.res.fail({ code: err.code, msg: err.message });
            } else {
                ctx.app.emit('error', err, ctx);
            }
        }
    };
};
