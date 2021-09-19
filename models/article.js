export function handleArticleList (article) {
    let result = []
    let hash = new Set()
    for(let i = 0, t = -1; i < article.length; i++) {
        if(!hash.has(article[i].article_id)){
            hash.add(article[i].article_id)
            t++
            result[t] = article[i]
            result[t].tag = [{tag_id: article[i].tag_id, tag_title: article[i].tag_title, color: article[i].color}]
            delete result[t].tag_id
            delete result[t].tag_title
            delete result[t].color
        } else {
            result[t].tag.push({tag_id: article[i].tag_id, tag_title: article[i].tag_title, color: article[i].color})
        }
    }
    return result
}
