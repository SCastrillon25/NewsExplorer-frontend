import { SearchNewsPage } from "../SearchNewsPage/SearchNewsPage";
import { AboutAuthor } from "../../components/AboutAuthor/AboutAuthor";

function Home({aboutAuthor }) {
    return ( 
        <>
            <SearchNewsPage /> 
            <AboutAuthor aboutAuthor={aboutAuthor}/>
        </>
        
     );
}

export {Home};