import { Header } from "../Main/Header/Hearder";
import { ListNewsSaved } from "./ListNewsSaved/ListNewsSaved";
import "./Main.css";


function Main() {
    
    return ( 
        <main className="main">
            <Header />
            <ListNewsSaved />
        </main>
     );
}

export { Main };