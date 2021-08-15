import {exec} from "../../models/db.js";

export async function addArticle (ctx, next) {
    let {title, category_id, description, content, publish_time} = ctx.request.body
    await exec(`INSERT INTO article(title, category_id, description, content, publish_time)
                     VALUES("${title}", ${category_id}, "${description}, "${content}, "${publish_time}"`)
    ctx.body = ctx.res.success()
}

export async function updateArticle (ctx, next) {
    let {id, title, category_id, description, content, publish_time} = ctx.request.body
    await exec(`UPDATE article
                    SET title = "${title}", category_id = ${category_id}, description = "${description}, content = "${content}, publishtime = "${publish_time}"
                    WHERE article_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    let id = ctx.params.id
    await exec(`DELETE FROM category
                    WHERE article_id = ${id}`)
    ctx.body = ctx.res.success()
}

