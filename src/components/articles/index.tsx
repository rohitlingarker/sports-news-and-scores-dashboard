import ArticlesList from "./ArticlesList";

const Articles = ()=>{
    return(
        <div className="container">
            <h1 className="text-xl font-bold underline mb-2">Trending News</h1>
            <div className="max-w-4xl">
                <ArticlesList/>
            </div>
        </div>
    )
}

export default Articles;