import imageAutor from "../../assets/img.jpg";
import "./AboutAuthor.css";

function AboutAuthor({aboutAuthor}) {
    return (
        <>
            { aboutAuthor && (
                <div className="aboutAuthor">
                    <div className="aboutAuthor__container-img">
                        <img className="aboutAuthor__container-img__img" src={imageAutor} alt="Author" />
                    </div>

                    <div className="aboutAuthor__container-text">
                        <h2 className="aboutAuthor__container-text__title">About the author</h2>
                        <p className="aboutAuthor__container-text__paragraph">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
                        <p className="aboutAuthor__container-text__paragraph">You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
                    </div>
                </div>)
            }
        </>
      );
}

export { AboutAuthor };