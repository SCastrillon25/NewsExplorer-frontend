import logoFace  from "../../assets/face.svg";
import logoGit from "../../assets/github.svg";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p className="footer__container__text">&copy; 2026 Supersite. Powered by News API</p>
            </div>
            <div className="footer__container-logos">
                <p className="footer__container-logos__home">Home</p>
                <a 
                    className="footer__container-logos__git"
                    href="https://github.com/SCastrillon25"
                    target="_blank"
                    rel="noreferrer"
                >
                    Scastrillon25
                    <img src={logoGit} alt="logoGit" />
                </a>
                
                <img className="footer__container-logos__face" src={logoFace} alt="logoFace" />
            </div>
        </footer>
    );
}

export { Footer };