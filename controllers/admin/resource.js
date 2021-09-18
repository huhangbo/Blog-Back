import {exec} from "../../models/db.js";


export async function addResource (ctx, next) {
    const {title, description, content, publishTime} = ctx.request.body
    const result = await exec(`INSERT INTO resource(title, description, content, publish_time)
                                    VALUES("${title}", ${description}, "${description}, "${content}, "${publishTime}"`)

    ctx.body = ctx.res.success()
}

export async function updateResource (ctx, next) {
    let {id, title, description, content, publishTime} = ctx.request.body
    await exec(`UPDATE resource
                    SET title = "${title}", description = "${description}", content = "${content}", publish_time = "${publishTime}"
                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteCategory (ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM resource
                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success()
}
