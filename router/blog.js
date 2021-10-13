import Router from 'koa-router'
import * as authorPublic from "../controllers/public/authorInfo.js"
import * as articlePublic from "../controllers/public/article.js"
import * as resourcePublic from "../controllers/public/resource.js"

const blogRouter = new Router()

blogRouter.get('/author',authorPublic.getAuthorInfo)

blogRouter.get('/:type', articlePublic.getType)

blogRouter.get('/:type/:detail/:page/:pageSize', articlePublic.getArticleByType)

blogRouter.get('/article/:page/:pageSize', articlePublic.getArticleByType)

blogRouter.get('/article/:id', articlePublic.getArticleById)

blogRouter.get('/resource/:id', resourcePublic.getResourceById)


export default blogRouter
