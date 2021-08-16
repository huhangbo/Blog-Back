import Router from 'koa-router'
import koaJwt from "koa-jwt";
import * as authorAdmin from '../controllers/admin/author.js'
import * as menuAdmin from '../controllers/admin/menu.js'
import * as categoryAdmin from '../controllers/admin/category.js'
import * as tagAdmin from '../controllers/admin/tag.js'
import * as resourceAdmin from '../controllers/admin/resource.js'
import * as articleAdmin from '../controllers/admin/article.js'


const adminRouter = new Router()

adminRouter.prefix('/admin')

adminRouter.use(koaJwt({secret: "blog"}).unless({path: ['/admin/login']}))

adminRouter.post('/login', authorAdmin.login)

adminRouter.post('/author/update', authorAdmin.updateAuthorInfo)

adminRouter.post('/menu/add', menuAdmin.addMenu)

adminRouter.post('/menu/update', menuAdmin.updateMenu)

adminRouter.delete('/menu/delete/:id', menuAdmin.deleteMenu)

adminRouter.post('/category/add', categoryAdmin.addCategory)

adminRouter.post('/category/update', categoryAdmin.updateCategory)

adminRouter.delete('/category/delete/:id', categoryAdmin.deleteCategory)

adminRouter.post('/tag/add', tagAdmin.addTag)

adminRouter.post('/tag/update', tagAdmin.updateTag)

adminRouter.delete('/tag/delete/:id', tagAdmin.updateTag)

adminRouter.post('/article/add', articleAdmin.addArticle)

adminRouter.post('/article/update', articleAdmin.updateArticle)

adminRouter.delete('/article/delete/:id', articleAdmin.deleteArticle)

adminRouter.post('/resource/category/add', resourceAdmin.addResourceCategory)

adminRouter.post('/resource/category/update', resourceAdmin.updateResourceCategory)

adminRouter.delete('/resource/category/delete/:id', resourceAdmin.deleteResourceCategory)

adminRouter.post('/resource/add', resourceAdmin.addResource)

adminRouter.post('/resource/update', resourceAdmin.updateResource)

adminRouter.delete('/resource/delete/:id', resourceAdmin.deleteCategory)

export default adminRouter
