import {exec} from "../../models/db.js";

export async function addCategory (ctx, next) {
    let {title, icon} = ctx.request.body
    await exec(`INSERT INTO category(title, icon)
                     VALUES("${title}", "${icon}")`)
    ctx.body = ctx.res.success()
}

export async function updateCategory (ctx, next) {
    let {id, title, icon} = ctx.request.body
    await exec(`UPDATE category
                    SET title = "${title}", icon = "${icon}"
                    WHERE category_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    let id = ctx.params.id
    await exec(`DELETE FROM category
                    WHERE category_id = ${id}`)
    ctx.body = ctx.res.success()
}
