import Router from 'koa-router'
import * as authorPublic from "../controllers/public/authorInfo.js"
import * as articlePublic from "../controllers/public/article.js"
import * as resourcePublic from "../controllers/public/resource.js"

const blogRouter = new Router()

blogRouter.get('/author',authorPublic.getAuthor)

blogRouter.get('/social', authorPublic.getSocial)

blogRouter.get('/menu', authorPublic.getMenu)

blogRouter.get('/category', articlePublic.getCategory)

blogRouter.get('/category/:id', articlePublic.getArticleByCategory)

blogRouter.get('/article/category/:id', articlePublic.getArticleCategory)

blogRouter.get('/tag', articlePublic.getTag)

blogRouter.get('/tag/:id', articlePublic.getArticleByTag)

blogRouter.get('/article/:id', articlePublic.getArticleById)

blogRouter.get('/article/tag/:id', articlePublic.getArticleTag)

blogRouter.get('/article/:page/:pageSize', articlePublic.getArticleByPage)

blogRouter.get('/resource/category', resourcePublic.getResourceCategory)

blogRouter.get('/resource/category/:id', resourcePublic.getCategoryByResource)

blogRouter.get('/resource/resource/category/:id', resourcePublic.getResourceByCategory)

blogRouter.get('/resource/:id', resourcePublic.getResourceById)


export default blogRouter
