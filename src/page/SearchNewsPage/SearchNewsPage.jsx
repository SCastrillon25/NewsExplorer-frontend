import { useContext} from "react";
import { NewsContext } from "../../contexts/NewsContext";
import { Preloader } from "../../components/Preloader/Preloader";
import { NotFound } from "../../components/NotFound/NotFound";
import { SearchResults } from "../../components/SearchResults/SearchResults";


function SearchNewsPage() {

const {keyword, isLoading, register, isHome, isLogin, articles, error, handleSaveArticle, handleDeleteArticle } = useContext(NewsContext);

if (isLoading) {
    return <Preloader />
}

if (error) {
    return (
        <p className="searchNewsPage__error">
            {error}
        </p>
    )
}

if (!articles || articles.length === 0) {
    return  <NotFound />
}

    return ( 
        <>   
            <SearchResults 
                register={register}
                articles={articles}
                keyword={keyword}
                isHome={isHome}
                isLogin={isLogin}
                handleSaveArticle={handleSaveArticle}
                handleDeleteArticle={handleDeleteArticle}
            />
        </> 
     );
}

export { SearchNewsPage };