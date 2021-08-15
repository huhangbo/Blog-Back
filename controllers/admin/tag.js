import {exec} from "../../models/db.js";

export async function addTag (ctx, next) {
    let {title, icon} = ctx.request.body
    await exec(`INSERT INTO tag(title, icon)
                     VALUES("${title}", "${icon}")`)
    ctx.body = ctx.res.success()
}

export async function updateTag (ctx, next) {
    let {id, title, color} = ctx.request.body
    await exec(`UPDATE Tag
                    SET title = "${title}", color = "${color}"
                    WHERE tag_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {

    let id = ctx.params.id
    await exec(`DELETE FROM tag
                    WHERE category_id = ${id}`)
    ctx.body = ctx.res.success()
}
