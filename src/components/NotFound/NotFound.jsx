import notFoundImage from "../../assets/not-found.svg"
import "./NotFound.css";

function NotFound() {
    return ( 
        <div className="notFound">
            <img className="notFound__image" src={notFoundImage} ></ img>
            <h1 className="notFound__title">Nothing found</h1>
            <h2 className="notFound__subTitle">Sorry, but nothing matched <br/>your search terms.</h2>
        </div>
     );
}

export { NotFound };