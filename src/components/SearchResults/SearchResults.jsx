import { useState} from "react";
import { NewsCard } from "./NewsCard/NewsCard";
import "./SearchResults.css";

function SearchResults({ keyword, register, articles, isHome, handleSaveArticle, handleDeleteArticle, isLogin }) {
    const [visibleCards, setVisibleCards] = useState(3);

    const handleMoreNews = () => {
        setVisibleCards((prev) => prev + 3)
    }
    return (
        (articles.length > 0 && (
            <div className="searchResults">
            <h1 className="searchResults__title">Search results for: {keyword}</h1>

            
                <ul className="newsCardList">
                    {articles.slice(0, visibleCards).map((article, index) => (
                        <NewsCard 
                            key={article.url || index}
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