import { NewsSearch } from "../../components/NewsSearch/NewsSearch";
import { AboutAuthor } from "../../components/AboutAuthor/AboutAuthor";
import { ModalSignIn } from "../../components/Popup/ModalSignIn/ModalSignIn";



function Register() {
    return ( 
        <>
            <ModalSignIn />
            <NewsSearch />
            <AboutAuthor />
        </>             
    );
}

export {Register};