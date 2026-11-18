import { useState, useEffect} from "react";
import { NewsCard } from "./NewsCard/NewsCard";
import "./SearchResults.css";

function SearchResults({ keyword, register, articles, isHome, handleSaveArticle, handleDeleteArticle, isLogin }) {
    const [visibleCards, setVisibleCards] = useState(3);
    const [validArticles, setValidArticles] = useState([]);

useEffect(() => {
    let cancelled = false;

    const checkImages = async () => {
        const checked = await Promise.all(
            articles.map((article) =>
                new Promise((resolve) => {
                    if (!article.image) {
                        resolve(null);
                        return;
                    }

                    const img = new Image();

                    img.onload = () => resolve(article);
                    img.onerror = () => resolve(null);

                    img.src = article.image;
                })
            )
        );

        if (!cancelled) {
            setValidArticles(checked.filter(Boolean));
        }
    };

    checkImages();

    return () => {
        cancelled = true;
    };
}, [articles]);    

    const handleMoreNews = () => {
        setVisibleCards((prev) => prev + 3)
    }
    return (
        (articles.length > 0 && (
            <div className="searchResults">
            <h1 className="searchResults__title">Search results for: {keyword}</h1>

            
                <ul className="newsCardList">
                    {validArticles.slice(0, visibleCards).map((article, index) => (
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

          {validArticles.length > visibleCards && (
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