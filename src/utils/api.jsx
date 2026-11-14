class Api {
    constructor({Url, key, backendURL}) {
        this.URL = Url;
        this.key = key;
        this.backendURL = backendURL;
    };

    _checkResponse(res) {
        
        return res.json().then((data) => {
            if (!res.ok) {
                return Promise.reject(data);
            }
            return data;
        });
    };

    // Generar headers dinámicos inyectando siempre el token de localStorage
    _getHeaders() {
        const token = localStorage.getItem('jwt');
        return {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        };
    };    

    searchNews(keyword = "") {
        const today = new Date();
        const fromDate = new Date();
        fromDate.setDate(today.getDate() - 7);

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        };

        const params = new URLSearchParams({
            access_key: this.key,
            keywords: keyword,
            languages: "en",
            limit: "100",
            date: `${formatDate(fromDate)},${formatDate(today)}`,
            sort: "published_desc",
        });

        if (keyword.trim()) {
            params.set("keywords", keyword);
        };

        return fetch(`${this.URL}/v1/news?${params}`)
            .then(this._checkResponse);
    };

    saveArticle(article) {
        return fetch(`${this.backendURL}/articles`, {
            method: "POST",
            headers: this._getHeaders(),
            body: JSON.stringify(article),
        })
        .then(this._checkResponse)
    };

    getArticles() {
        return fetch(`${this.backendURL}/articles`, {
            method: "GET",
            headers: this._getHeaders(),
        })
        .then(this._checkResponse);
    };

    deleteArticle(idArticle) {
        return fetch(`${this.backendURL}/articles/${idArticle}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        })
        .then(this._checkResponse)
    };

    
};

export const api = new Api({
    Url: "https://api.mediastack.com",
    key: import.meta.env.VITE_NEWS_API_KEY,
    backendURL: "https://newsexplorer-backend-mgmw.onrender.com",
})

