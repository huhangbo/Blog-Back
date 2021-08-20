import {exec} from "../../models/db.js";


export async function  getResourceCategory (ctx, next) {
    const resourceCategory = await exec(`SELECT resource_category_id, title, (
                                                    SELECT COUNT(*)
                                                    FROM resource_category_relation
                                                    WHERE resource_category_relation.resource_category_id =
                                                          resource_category.resource_category_id)
                                                    AS amount
                                         FROM resource_category
                                         GROUP BY resource_category_id
                                         ORDER BY resource_category_id`)
    ctx.body = ctx.res.success(resourceCategory)
}

export async function getResourceByCategory (ctx, next) {
    const categoryId = ctx.params.id
    const resource = await  exec(`SELECT resource_id, title, description
                                       FROM resource
                                       WHERE resource_id IN(
                                           SELECT resource_id 
                                           FROM resource_category_relation
                                           WHERE resource_category_relation.resource_id = ${categoryId}
                                           )`)
    ctx.body = ctx.res.success(resource)
}

export async function getCategoryByResource (ctx, next) {
    const resourceId = ctx.params.id
    const category = await exec(`SELECT resource_category_id, title
                                     FROM resource_category
                                     WHERE resource_category_id = (
                                         SELECT resource_category_id
                                         FROM resource_category_relation
                                         WHERE resource_id = ${resourceId}
                                         )`)
    ctx.body = ctx.res.success(category)
}

export async function getResourceById (ctx, next) {
    const id = ctx.params.id
    const resource = await exec(`SELECT resource_id, title, description, content, publish_time, count
                                    FROM resource
                                    WHERE resource_id = ${id}`)
    ctx.body = ctx.res.success(resource)
}


