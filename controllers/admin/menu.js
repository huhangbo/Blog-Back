import {exec} from "../../models/db.js";

export async function addMenu (ctx, next) {
    const {title, icon, url} = ctx.request.body
    await exec(`INSERT INTO menu(title, icon ,url)
                     VALUES("${title}", "${icon}", "${url}")`)
    ctx.body = ctx.res.success()
}

export async function updateMenu (ctx, next) {
    const {id, title, icon, url} = ctx.request.body
    await exec(`UPDATE menu
                    SET title = "${title}", icon = "${icon}", url = "${url}"
                    WHERE menu_id = ${id}`)
    ctx.body = ctx.res.success()
}

export async function deleteMenu(ctx, next) {
    const id = ctx.params.id
    await exec(`DELETE FROM menu
                    WHERE menu_id = ${id}`)
    ctx.body = ctx.res.success()
}
