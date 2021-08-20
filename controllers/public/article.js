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

export  async function getArticleByPage(ctx, next) {
    const page = ctx.params.page
    const pageSize = ctx.params.pageSize
    const article = await exec(`SELECT DISTINCT A.article_id AS article_id, A.title, description, publish_time, C.category_id, C.title AS category_title,E.tag_id, E.title AS tag_title
                                FROM (SELECT * FROM article LIMIT ${pageSize*(page-1)},${pageSize}) A
                                         LEFT JOIN article_category B
                                                   ON A.article_id = B.article_id
                                         LEFT JOIN category C
                                                   ON C.category_id = B.category_id
                                         LEFT JOIN article_tag D
                                                   ON D.article_id = A.article_id
                                         LEFT JOIN tag E
                                                   ON D.tag_id = E.tag_id`)
    let result = []
    let hash = new Set()
    for(let i = 0, t = -1; i < article.length; i++) {
        if(!hash.has(article[i].article_id)){
            hash.add(article[i].article_id)
            t++
            result[t] = article[i]
            result[t].tag = [{tag_id: article[i].tag_id, tag_title: article[i].tag_title}]
            delete result[t].tag_id
            delete result[t].tag_title
        } else {
            result[t].tag.push({tag_id: article[i].tag_id, tag_title: article[i].tag_title})
        }
    }
    ctx.body = ctx.res.success(result)
}
