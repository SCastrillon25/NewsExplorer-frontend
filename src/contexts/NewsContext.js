import { createContext } from "react";

export const NewsContext = createContext({
    register: false,
    keyword: "",
    articles: [],
    savedArticles: [],
    isLoading: false,
    isSaved: false,
    isHome: false,
    error: "",
});