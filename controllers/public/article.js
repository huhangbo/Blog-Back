import {exec} from "../../models/db.js";
import {handleArticleList} from "../../models/article.js";

export async function getCategory (ctx, next) {
    const category = await exec(`SELECT category_id, title, (
                                    SELECT COUNT(*)
                                    FROM article_category
                                    WHERE article_category.category_id =
                                          category.category_id)
                                    AS amount
                                    FROM category
                                 GROUP BY category_id
                                 ORDER BY category_id`)
    ctx.body = ctx.res.success(category)
}

export async function getTag (ctx, next) {
    const tag = await exec(`SELECT tag_id, title, color
                                 FROM tag`)
    ctx.body = ctx.res.success(tag)
}

export async function getArticleByCategory (ctx, next) {
    const {id, pageSize, page} = ctx.params
    const article = await exec(`SELECT A.article_id AS article_id, A.title, description, content, publish_time,
                                        C.category_id,
                                        C.title      AS category_title,
                                        E.tag_id,
                                        E.title      AS tag_title
                                 FROM (SELECT * 
                                    FROM article_category 
                                    WHERE category_id = ${id}
                                    LIMIT ${(page - 1) * pageSize}, ${pageSize}) B
                                          LEFT JOIN article A
                                                    ON A.article_id = B.article_id
                                          LEFT JOIN category C
                                                    ON C.category_id = B.category_id
                                          LEFT JOIN article_tag D
                                                    ON D.article_id = A.article_id
                                          LEFT JOIN tag E
                                                    ON D.tag_id = E.tag_id
                                          ORDER BY article_id`)
    const articleAmount = await exec(`SELECT COUNT(*) AS amount
                                          FROM article_category
                                          WHERE category_id = ${id}`)
    const result = handleArticleList(article)
    const totalPage =  Math.ceil(articleAmount[0].amount / pageSize)
    ctx.body = ctx.res.success({
        articles: result,
        page: {
            currentPage: page,
            pageSize: pageSize,
            totalPage: totalPage,
            articleAmount: articleAmount[0].amount
        }
    })
}

export async function getArticleByTag (ctx, next) {
    const {id, page, pageSize} = ctx.params
    const article = await exec(`SELECT A.article_id AS article_id, A.title, description, content, publish_time,
                                        C.category_id,
                                        C.title      AS category_title,
                                        E.tag_id,
                                        E.title      AS tag_title
                                 FROM (SELECT *
                                       FROM article_tag
                                       WHERE tag_id = ${id}
                                       LIMIT ${(page - 1) * pageSize}, ${pageSize}) D
                                          LEFT JOIN article A
                                                    ON A.article_id = D.article_id
                                          LEFT JOIN tag E
                                                    ON D.tag_id = E.tag_id
                                          LEFT JOIN article_category B
                                                    ON D.article_id = B.article_id
                                          LEFT JOIN category C
                                                    ON C.category_id = B.category_id
                                 ORDER BY article_id
    `)
    const articleAmount = await exec(`SELECT COUNT(*) AS amount
                                          FROM article_tag
                                          WHERE tag_id = ${id}`)
    const result = handleArticleList(article)
    const totalPage =  Math.ceil(articleAmount[0].amount / pageSize)
    ctx.body = ctx.res.success({
        articles: result,
        page: {
            currentPage: page,
            pageSize: pageSize,
            totalPage: totalPage,
            articleAmount: articleAmount[0].amount
        }
    })
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
    ctx.body = ctx.res.success(tags)
}

export async function getArticleById (ctx, next) {
    const id = ctx.params.id
    const article = await exec(`SELECT A.article_id AS article_id, A.title, description, content, publish_time,
                                             C.category_id,
                                             C.title      AS category_title,
                                             E.tag_id,
                                             E.title      AS tag_title
                                    FROM (SELECT * FROM article WHERE article_id = ${id}) A
                                      LEFT JOIN article_category B
                                                ON A.article_id = B.article_id
                                      LEFT JOIN category C
                                                ON C.category_id = B.category_id
                                      LEFT JOIN article_tag D
                                                ON D.article_id = A.article_id
                                      LEFT JOIN tag E
                                                ON D.tag_id = E.tag_id`)
    const result = handleArticleList(article)
    ctx.body = ctx.res.success(result[0])
}

export  async function getArticleByPage(ctx, next) {
    const {page, pageSize} = ctx.params
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
    const articleAmount = await exec(`SELECT COUNT(*) AS amount
                                          FROM article`)
    const totalPage =  Math.ceil(articleAmount[0].amount / pageSize)
    const result = handleArticleList(article)
    ctx.body = ctx.res.success({
        articles: result,
        page: {
            currentPage: page,
            pageSize: pageSize,
            totalPage: totalPage,
            articleAmount: articleAmount[0].amount
        }
    })
}
