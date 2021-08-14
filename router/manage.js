import Router from 'koa-router'
import jwtMiddleware from '../middlewares/jwt.js'
import * as blogAdmin from '../controllers/admin/index.js'
import koaJwt from "koa-jwt";


const manageRouter = new Router()

manageRouter.prefix('/admin')

manageRouter.use(koaJwt({secret: "blog"}).unless({path: ['/admin/login']}))

manageRouter.post('/login', blogAdmin.login)

export default manageRouter
