import {exec} from "../../models/db.js";

export async function getAuthor (ctx, next) {
    const author = await exec(`SELECT name, avatar, tag FROM author`)
    ctx.body = ctx.res.success(author[0])
}

export async function getSocial (ctx, next) {
    const social = await exec(`SELECT social_id, title, icon, url
                                    FROM social`)
    ctx.body = ctx.res.success(social)
}

export async function getMenu (ctx, next) {
    const menu = await exec(`SELECT menu_id, title, icon, url
                                 FROM menu
                                 ORDER BY menu_id`)
    const category = await exec(`SELECT category_id, title
                                     FROM category
                                     ORDER BY category_id`)
    const tag = await exec(`SELECT tag_id, title
                                 FROM tag
                                 ORDER BY tag_id`)
    menu[1].children = category
    menu[2].children = tag
    ctx.body = ctx.res.success(menu)
}
