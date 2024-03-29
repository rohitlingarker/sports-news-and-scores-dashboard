import ArticlesList from "./ArticlesList";

const Articles = () => {
  return (
    <div className="container col-span-8">
      <h1 className="text-xl font-bold underline mb-4 text-gray-900 ">
        Trending News
      </h1>
      <div className="max-w-4xl">
        <ArticlesList />
      </div>
    </div>
  );
};

export default Articles;
