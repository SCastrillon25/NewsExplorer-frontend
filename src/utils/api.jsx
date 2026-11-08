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

    searchNews(keyword) {
        const params = new URLSearchParams({
            access_key: this.key,
            keywords: keyword,
            languages: "en",
            limit: "100",
        });
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
    key: "99b7c7bd33ce8c9431f7fa30b2cebcce",
    backendURL: "http://localhost:3000",
})