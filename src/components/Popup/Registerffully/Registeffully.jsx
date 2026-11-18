import { Link } from "react-router-dom";
import "./Registerffully.css";

function Registerffully() {
    return ( 
        <form className="form">
            <Link className="form__link" to="/signin" >Sign in</Link>
        </form>
     );
}

export { Registerffully };