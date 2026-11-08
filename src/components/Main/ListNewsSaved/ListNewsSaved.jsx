import { useContext } from "react";
import { NewsContext } from "../../../contexts/NewsContext";
import { NewsCard } from "../../SearchResults/NewsCard/NewsCard";


function ListNewsSaved() {
    const {savedArticles = [], isLoading, register, isLogin, isSaved, handleSaveArticle, handleDeleteArticle, isHome } = useContext(NewsContext);

    return ( 
        <div className="listNews">
            <ul className="listNews__saved-news">
                {savedArticles.length > 0 && savedArticles.map((savedArticle) => (
                    <NewsCard 
                            key={savedArticle.url}
                            article={savedArticle}
                            register={register}
                            isLoading={isLoading}
                            isSaved={isSaved}
                            handleSaveArticle={handleSaveArticle}
                            handleDeleteArticle={handleDeleteArticle}
                            isLogin={isLogin}
                            isHome={isHome}
                    />
                ))}
            </ul>
        </div>
     );
}

export { ListNewsSaved };