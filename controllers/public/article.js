import {exec, mongoClient} from "../../models/db.js";
import {mongoConfig} from "../../config/config.js";
import {ObjectId} from "mongodb";

const articleCollection = mongoClient.db(mongoConfig.dbName).collection("article")

export async function getType (ctx) {
    const {type} = ctx.params
    const tag = await exec(() => articleCollection.distinct(type))
    if (type === "category") {
        for (let i=0; i<tag.length; i++) {
            tag[i] = {
                title: tag[i],
                amount: await exec(() => articleCollection.find({category: tag[i]}).count())
            }
        }

    }
    ctx.body = ctx.res.success(tag)
}

export async function getArticleByType (ctx) {
    const {type, detail, pageSize, page} = ctx.params
    const article = await exec(() => articleCollection.find({[type]: detail}, {
        skip: (1-1)*10,
        limit: 10,
        projection: {content: 0}
    }).toArray())
    const articleAmount = await exec(() => articleCollection.find({[type]: detail}).count())
    const totalPage =  Math.ceil(articleAmount / pageSize)
    ctx.body = ctx.res.success({
        articles: article,
        page: {
            currentPage: page,
            pageSize: pageSize,
            totalPage: totalPage,
            articleAmount: articleAmount
        }
    })
}

export async function getArticleById (ctx) {
    const id = ctx.params.id
    const article = await exec(() => articleCollection.find({_id : ObjectId(`${id}`)}).toArray())
    ctx.body = ctx.res.success(article[0])
}
