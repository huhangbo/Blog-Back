import {exec} from "../../models/db.js";

export async function getCategory (ctx, next) {
    const category = await exec(`SELECT category_id, title, icon
                                     FROM category`)
    ctx.body = ctx.res.success(category)
}

export async function getTag (ctx, next) {
    const tag = await exec(`SELECT tag_id, title, color
                                 FROM tag`)
    ctx.body = ctx.res.success(tag)
}

export async function getArticleByCategory (ctx, next) {
    const categoryId = ctx.params.id
    const articles = await exec(`SELECT article_id, title, description
                                    FROM article
                                    WHERE article_id IN (
                                        SELECT article_id
                                        FROM article_category
                                        WHERE category_id = "${categoryId}"
                                        )`)
    ctx.body = ctx.res.success(articles)
}

export async function getArticleByTag (ctx, next) {
    const tagId = ctx.params.id
    const articles = await exec(`SELECT article_id, title, description 
                                    FROM article 
                                    WHERE article_id IN (
                                        SELECT article_id
                                        FROM article_tag
                                        WHERE tag_id = ${tagId}
                                        )`)
    ctx.body = ctx.res.success(articles)
}

export async function getArticleCategory (ctx, next) {
    const articleId = ctx.params.id
    const category = await exec(`SELECT category_id, title
                                     FROM category
                                     WHERE category_id = (
                                         SELECT category_id
                                         FROM article_category
                                         WHERE article_id = ${articleId}
                                         )`)
    ctx.body = ctx.res.success(category)
}

export async function getArticleTag (ctx, next) {
    const articleId = ctx.params.id
    const tags = await exec(`SELECT tag_id, title
                                 FROM tag
                                 WHERE tag_id IN (
                                     SELECT tag_id
                                     FROM article_tag
                                     WHERE article_id = ${articleId}
                                     )`)
    console.log(tags)
    ctx.body = ctx.res.success(tags)
}

export async function getArticleById (ctx, next) {
    const id = ctx.params.id
    const info = await exec(`SELECT article_id, title, description, content, publish_time, count
                                 FROM article
                                 WHERE article_id = ${id}`)
    ctx.body = ctx.res.success(info)
}
