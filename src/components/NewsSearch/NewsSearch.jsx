import "./NewsSearch.css";


function NewsSearch({handleSearch}) {
    const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const keyWord = form.elements.keyword.value.trim();

    if (!keyWord) {
        return;
    }

    handleSearch(keyWord);

    console.log("buscando", keyWord);
}

    return (    
        <div className="newsSearch">
            <div className="newsSearch__container-fondo">
                <div className="newsSearch__container-fondo__shadow"></div>
                 <div className="newsSearch__container-fondo__img"></div>
            </div>
           
            <div className="newsSearch__search">
                <h1 className="newsSearch__search__title">What's going on in the world?</h1>
                <h2 className="newsSearch__search__subtitle">Find the latest news on any topic and save them in your personal account.</h2>

                <form className="newsSearch__search__form" onSubmit={handleSubmit}>
                    <input className="newsSearch__search__form__text" placeholder="Enter topic" type="text" name="keyword" />
                    <input className="newsSearch__search__form__submit" type="submit" />
                </form>
            </div>
        </div>
      );
}

export { NewsSearch };