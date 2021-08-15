import {exec} from "../../models/db.js";

export async function addResourceCategory (ctx, next) {
    let {title, icon} = ctx.request.body
    await exec(`INSERT INTO resource_category(title, icon)
                     VALUES("${title}", "${icon}")`)
    ctx.body = ctx.res.success()
}

export async function updateResourceCategory (ctx, next) {
    let {id, title, icon} = ctx.request.body
    await exec(`UPDATE resource_category
                    SET title = "${title}", icon = "${icon}"
                    WHERE resource_category_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteResourceCategory (ctx, next) {
    let id = ctx.params.id
    await exec(`DELETE FROM category
                    WHERE resource_category_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function addResource (ctx, next) {
    let {title, category_id, description, content, publish_time} = ctx.request.body
    await exec(`INSERT INTO resource(title, category_id, description, content, publish_time)
                     VALUES("${title}", ${category_id}, "${description}, "${content}, "${publish_time}"`)
    ctx.body = ctx.res.success()
}

export async function updateResource (ctx, next) {
    let {id, title, resource_category_id, description, content, publish_time} = ctx.request.body
    await exec(`UPDATE resource
                    SET title = "${title}", resource_category_id = ${resource_category_id}, description = "${description}, content = "${content}, publishtime = "${publish_time}"
                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    let id = ctx.params.id
    await exec(`DELETE FROM category
                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success()
}
