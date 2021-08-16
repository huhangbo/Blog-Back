import {exec} from "../../models/db.js";

export async function getAuthor (ctx, next) {
    const author = await exec(`SELECT user, avatar, tag FROM author`)
    ctx.body = ctx.res.success(author)
}

export async function getSocial (ctx, next) {
    const social = await exec(`SELECT social_id, title, icon, url
                                    FROM social`)
    ctx.body = ctx.res.success(social)
}

export async function getMenu (ctx, next) {
    const menu = await exec(`SELECT menu_id, title, icon, url
                                 FROM menu`)
    ctx.body = ctx.res.success(menu)
}
