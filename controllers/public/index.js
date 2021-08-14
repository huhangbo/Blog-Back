import {exec} from "../../models/db.js"

export async function getAuthor (ctx, next) {
    const author = await exec(`SELECT user, avatar, tag FROM author`)
    ctx.body = ctx.res.success(author)
}

export async function getSocial (ctx, next) {
    const social = await exec("SELECT * FROM social")
    ctx.body = ctx.res.success(social)
}

export async function getMenu (ctx, next) {
    const menu = await exec("SELECT * FROM menu")
    ctx.body = ctx.res.success(menu)
}

export async function getCategory (ctx, next) {
    const category = await exec("SELECT * FROM category")
    ctx.body = ctx.res.success(category)
}

export async function getTag (ctx, next) {
    const tag = await exec("SELECT * FROM tag")
    ctx.body = ctx.res.success(tag)
}

export async function  getResourceCategory (ctx, next) {
    const resourceCategory = await exec("SELECT * FROM resource_category")
    ctx.body = ctx.res.success(resourceCategory)
}

export async function getArticleByCategory (ctx, next) {
    let categoryId = ctx.params.id
    const articles = await exec(`SELECT article_id, title, description
                                    FROM article 
                                    WHERE category_id = ${categoryId}`)
    ctx.body = ctx.res.success(articles)
}

export async function getArticleByTag (ctx, next) {
    let tagId = ctx.params.id
    const articles = await exec(`SELECT article_id, title, description 
                                    FROM article 
                                    WHERE category_id = ${tagId}`)
    ctx.body = ctx.res.success(articles)
}

export async function getResourceById (ctx,next) {
    let categoryId = ctx.params.id
    const resource = await exec(`SELECT article_id, title, description 
                                    FROM article 
                                    WHERE category_id = ${categoryId}`)
    ctx.body = ctx.res.success(resource)
}
