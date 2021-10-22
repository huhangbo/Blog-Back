import {mongoConfig} from "../config/config.js";
import {MongoClient} from "mongodb";


export const mongoClient = new MongoClient(mongoConfig.url)

export async function exec (todo) {
    try {
        await mongoClient.connect()
        return await todo()
    } finally {
        await mongoClient.close()
    }
}

// async function add () {
//     await exec(() => tmp.insertOne({
//         title: "自动化测试",
//         description: "前端自动化测试，现在已经成了不可缺少的技能。每个公司都在使用。也许你正欠缺这方面的知识，那这篇文章就可以帮你走入前端自动化测试的大门。这只是基础文章，希望能帮你入门就好。",
//         content : "VSCode 想写这个文章已经很久了，但是一直觉的需要的人可能会很少，毕竟VSCode这种每天都使用IDE工具，基本在1小时内就可以快速上手，但是通过我对身边同事的观察，我发现还是有很多小伙伴使用不够精通。特别是现在越来越多的插件，有的非常好用，直接可以提高我们的开发效率，那从今天开始，我开始更新VSCode的一些插件和技巧，这个并不是定期更新，而是我有了好的素材就会更新。",
//         category: "college",
//         tag: ["FrontEnd", "BackEnd"]
//     }))
// }
