import {exec} from "../../models/db.js";

export async function addTag (ctx, next) {
    const {title, color} = ctx.request.body
    await exec(`INSERT INTO tag(title, color)
                     VALUES("${title}", "${color}")`)
    ctx.body = ctx.res.success()
}

export async function updateTag (ctx, next) {
    const {id, title, color} = ctx.request.body
    await exec(`UPDATE Tag
                    SET title = "${title}", color = "${color}"
                    WHERE tag_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteTag (ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM tag
                    WHERE tag_id = ${id}`)
    await exec(`DELETE FROM  article_tag
                    WHERE tag_id = ${id}`)
    ctx.body = ctx.res.success()
}
