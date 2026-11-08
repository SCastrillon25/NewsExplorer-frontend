import { useContext , useState} from "react";
import { NewsContext } from "../../contexts/NewsContext"
import { NewsCard } from "./NewsCard/NewsCard";
import "./SearchResults.css";

function SearchResults() {
    const { keyword, register, articles, isHome, handleSaveArticle, handleDeleteArticle, isLogin } = useContext(NewsContext); 
    const [visibleCards, setVisibleCards] = useState(3);

    const handleMoreNews = () => {
        setVisibleCards((prev) => prev + 3)
    }
    return (
        (articles.length > 0 && (
            <div className="searchResults">
            <h1 className="searchResults__title">Search results for: {keyword}</h1>

            {articles.length > 0 && (
                <ul className="newsCardList">
                    {articles.slice(0, visibleCards).map((article) => (
                        <NewsCard 
                            key={article.url}
                            article={article}
                            register={register}
                            isHome={isHome}
                            handleSaveArticle={handleSaveArticle}
                            handleDeleteArticle={handleDeleteArticle}
                            isLogin={isLogin}
                            keyword={keyword}
                        />
                    ))}
                </ul>
            )}

          {articles.length > 3 && (
            <button
              className="searchResults__buttonShowMore"
              type="button"
              onClick={handleMoreNews}
            >
              Show more
            </button>
          )}
        </ div>
    )))

};

export { SearchResults };