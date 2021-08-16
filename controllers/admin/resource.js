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
    await exec(`DELETE FROM resource_category
                    WHERE resource_category_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function addResource (ctx, next) {
    const {title, resourceCategoryId, description, content, publishTime} = ctx.request.body
    const result = await exec(`INSERT INTO resource(title, description, content, publish_time)
                                    VALUES("${title}", ${description}, "${description}, "${content}, "${publishTime}"`)
    await exec(`INSERT INTO resource_category_relation(resource_id, resource_category_id) 
                    VALUES(${result.insertId}, ${resourceCategoryId})`)
    ctx.body = ctx.res.success()
}

export async function updateResource (ctx, next) {
    let {id, title, resourceCategoryId, description, content, publishTime} = ctx.request.body
    await exec(`UPDATE resource
                    SET title = "${title}", description = "${description}", content = "${content}", publish_time = "${publishTime}"
                    WHERE resource_id = ${id}`)
    await exec(`UPDATE resource_category_relation
                    SET resource_id = ${id}, resource_category_id = ${resourceCategoryId}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM resource
                    WHERE resource_id = ${id}`)
    await exec(`DELETE FROM resource_category_relation
                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success()
}
