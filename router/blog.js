import Router from 'koa-router'
import * as blogPublic from "../controllers/public/index.js"


const blogRouter = new Router()

blogRouter.get('/author', blogPublic.getAuthor)

blogRouter.get('/social', blogPublic.getSocial)

blogRouter.get('/menu', blogPublic.getMenu)

blogRouter.get('/category', blogPublic.getCategory)

blogRouter.get('/category/:id', blogPublic.getArticleByCategory)

blogRouter.get('/tag', blogPublic.getTag)

blogRouter.get('/tag/:id', blogPublic.getArticleByTag)

blogRouter.get('/resource', blogPublic.getResourceCategory)

blogRouter.get('/resource/:id', blogPublic.getResourceById)


export default blogRouter
