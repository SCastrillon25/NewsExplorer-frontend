import { useContext } from "react";
import { NewsContext } from "../../../contexts/NewsContext";

function Header() {
    const {savedArticles = [], userName} = useContext(NewsContext);

    const keywords = [
        ...new Set(savedArticles.map((article) => article.keyword).filter(Boolean))
    ];

    const renderKeywords = () => {
        if (savedArticles.length === 0) {
            return "without keywords";
        }

        if (keywords.length <= 2) {
            return keywords.join(" and ");
        }

        if (keywords.length > 2) {
            return `${keywords[0]}, ${keywords[1]}, and ${keywords.length - 2} others`;
        }
    };

    return (  
        <header className="header">
            <h4 className="header__first-title">Saved articles</h4>
            <h1 className="header__second-title">{userName}, you have {savedArticles.length} saved articles</h1>
            <h3 className="header__third-title">By keywords :{renderKeywords()}</h3>
        </header>
    );
}

export { Header };