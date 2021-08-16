import {exec} from "../../models/db.js";

export async function addCategory (ctx, next) {
    const {title, icon} = ctx.request.body
    await exec(`INSERT INTO category(title, icon)
                     VALUES("${title}", "${icon}")`)
    ctx.body = ctx.res.success()
}

export async function updateCategory (ctx, next) {
    const {id, title, icon} = ctx.request.body
    await exec(`UPDATE category
                    SET title = "${title}", icon = "${icon}"
                    WHERE category_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM category
                    WHERE category_id = ${id}`)
    await exec(`DELETE FROM article_category
                    WHERE category_id = ${id}`)
    ctx.body = ctx.res.success()
}
