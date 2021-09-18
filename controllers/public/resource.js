import {exec} from "../../models/db.js";


export async function getResourceById (ctx, next) {
    const id = ctx.params.id
    const resource = await exec(`SELECT resource_id, title, description, content, publish_time, count
                                    FROM resource
                                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success(resource)
}


