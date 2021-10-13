import {exec} from "../../models/db.js";
import {mongoClient} from "../../models/db.js";
import {mongoConfig} from "../../config/config.js";

const authorCollection = mongoClient.db(mongoConfig.dbName).collection("author")

export async function getAuthorInfo (ctx, next) {
    const author = await exec(() => authorCollection.find({}).toArray())
    ctx.body = ctx.res.success(author[0])
}
