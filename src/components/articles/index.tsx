import ArticlesList from "./ArticlesList";

const Articles = ()=>{
    return(
        <div className="live-matches-container">
            <h1 className="text-3xl font-bold underline">Trending News</h1>
            <div className="">
                <ArticlesList/>
            </div>
        </div>
    )
}

export default Articles;