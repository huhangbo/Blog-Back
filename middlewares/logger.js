import log4js from 'log4js'
import {logConfig} from "../config/config.js";


log4js.configure(logConfig)

export const logger = log4js.getLogger('[default]')

export const loggerMiddleware = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    const remoteAddress = ctx.headers['x-forwarded-for'] || ctx.ip || ctx.ips ||
        (ctx.socket && (ctx.socket.remoteAddress || (ctx.socket.socket && ctx.socket.socket.remoteAddress)))
    let logText = `${ctx.method} ${ctx.status} ${ctx.url} 请求参数： ${JSON.stringify(ctx.request.body)} 响应参数： ${JSON.stringify(ctx.body)} 请求ip：${remoteAddress} - ${ms}ms`
    logger.debug(logText)
}

