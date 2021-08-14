import Koa from 'koa'
import Http from "http"
import bodyParser from 'koa-bodyparser'
import helmet from "koa-helmet";
import staticCache from 'koa-static-cache'
import {serverConfig} from "./config/config.js";
import {loggerMiddleware} from './middlewares/logger.js'
import {response, error} from './middlewares/response.js'
import blogRouter from "./router/blog.js";
import manageRouter from "./router/manage.js";

const app = new Koa()

app.use(loggerMiddleware)

app.use(bodyParser())

app.use(response())

app.use(error())

app.use(helmet())

//app.use(staticCache(serverConfig))

app.use(blogRouter.routes()).use(blogRouter.allowedMethods())

app.use(manageRouter.routes()).use(manageRouter.allowedMethods())

const server = Http.createServer(app.callback())

server.listen(3000)
