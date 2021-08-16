import {exec} from "../../models/db.js"

export async function addArticle (ctx, next) {
    let {title, description, content, publishTime, categoryId, tagIds} = ctx.request.body
    const result = await exec(`INSERT INTO article(title, description, content, publish_time)
                                   VALUES("${title}", "${description}", "${content}", "${publishTime}")`)
    await exec(`INSERT INTO article_category(article_id, category_id)
                    VALUES(${result.insertId}, ${categoryId})`)
    tagIds.map(async item => {
        await exec(`INSERT INTO article_tag(article_id, tag_id)
                        VALUES(${result.insertId}, ${item})`)
    })
    ctx.body = ctx.res.success()
}

export async function updateArticle (ctx, next) {
    const {id, title, description, content, publishTime, categoryId, tagIds} = ctx.request.body
    await exec(`UPDATE article
                    SET title = "${title}", description = "${description}", content = "${content}", publish_time = "${publishTime}"
                    WHERE article_id = ${id}`)
    await exec(`UPDATE article_category
                    SET category_id = ${categoryId}
                    WHERE category_id = ${id}`)
    await exec(`DELETE FROM article_tag
                    WHERE article_id = ${id}`)
    tagIds.map(async item => {
        await exec(`INSERT INTO  article_tag(article_id, tag_id)
                        VALUES (${id}, ${item})`)
    })
    ctx.body = ctx.res.success()
}

export async function deleteArticle (ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM article
                    WHERE article_id = ${id}`)
    await exec(`DELETE FROM article_category
                    WHERE article_id = ${id}`)
    await exec(`DELETE FROM article_tag
                    WHERE article_id = ${id}`)
    ctx.body = ctx.res.success()
}
