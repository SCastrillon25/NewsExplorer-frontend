import bookmarkIcon from "../../../assets/bookmark.svg";
import trashIcon from "../../../assets/trash.svg";
import "./NewsCard.css";

function NewsCard({ article, isHome, isLogin,  handleSaveArticle, handleDeleteArticle }) {
    const handleImageError = (event) => {
        event.currentTarget.style.display = "none";
    };
    
    return ( 
        <li className="newsCard">
            <div className="newsCard__container">
                <img 
                    className="newsCard__container-image"     
                    src={article.image} 
                    onError={handleImageError}
                    alt="image-news" 
                />
            </div>
           {isLogin && !isHome && <p className="newsCard__keyword" >{article.keyword}</p>}
            <button 
                onClick={isHome & isLogin ? () => handleSaveArticle(article) : () => handleDeleteArticle(article._id)}
                className="newsCard__button" 
                type="button">
                    <img 
                        src={isHome ? bookmarkIcon : trashIcon}
                        className="newsCard__button__image" 
                        alt=""/>                
            </button>
            {isLogin && isHome 
                ?  <></>               
                :  <p className="newsCard__hover">
                        {isLogin && !isHome 
                            ? "Removed from saved" 
                            : "Sign in to save article"}
                    </p>
            }
            <div className="newsCard__date"> 
                {article.published_at
                    ? new Date(article.published_at).toLocaleDateString("es-CO")
                    : ""}
            </div>
            <div className="newsCard__titleNews">
                {article.title}
            </div>
            <div className="newsCard__news">
                {article.description}
            </div>
            <div className="newsCard__reference">{article.source}</div>
        </li>
     );
}

export { NewsCard };