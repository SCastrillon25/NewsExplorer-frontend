import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { NavBar } from "../NavBar/NavBar";
import { NewsSearch } from "../NewsSearch/NewsSearch";
import { api } from "../../utils/api";
import { AboutAuthor } from "../AboutAuthor/AboutAuthor";
import { Footer } from "../Footer/Footer";
import { SearchNewsPage } from "../../page/SearchNewsPage/SearchNewsPage";
import { Modal } from "../Popup/Modal";
import { ModalSignIn } from "../Popup/ModalSignIn/ModalSignIn";
import { ModalSignUp } from "../Popup/ModalSingUp/ModalSingUp"
import { ModalPhoneVist } from "../Popup/ModalPhoneVist/ModalPhoneVist";
import { Registerffully } from "../Popup/Registerffully/Registeffully";
import { Register } from "../../page/Register/Register";
import { NewsContext } from "../../contexts/NewsContext";
import { ProtectedRoute } from "../ProtectedRoutes/ProtectedRoute";
import { Protected } from "../../page/Protected/Protected"
import { Home } from "../../page/Home/Home";
import * as auth from "../../utils/auth";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [savedArticles, setSavedArticles] = useState([]);
  const [titleWhite, setTitleWhite] = useState(false)
  const [userName, setUserName] = useState("");
  const [, setToken] = useState(() => 
    localStorage.getItem("jwt") || ""
  );

const register = location.pathname === "/saved-news";

const isHome = location.pathname !== "/saved-news";

const aboutAuthor = location.pathname !== "/saved-news";

const handleSearch = (searchKeyword) => {
  setKeyword(searchKeyword);
  setError("");
  setArticles([]);
  setIsLoading(true);
  
  {isLogin ? setIsLoading(true) : setIsLogin(false)};
  {isLogin ? navigate("home-save-news") : navigate("News")};

  api.searchNews(searchKeyword)
    .then((data) => {
      setArticles(data.data || [])
    })
    .catch((err) => {
      console.error("Error al buscar noticias:", err);
      setError(
        err?.error?.message ||
        err?.message ||
        "No fue posible cargar las noticias."
      );
    })
    .finally(() => {
      setIsLoading(false);
    });
  
};  

  const handleRegister = async ({ email, password, username }) => {
    try {
      const data = await auth.register({
        email,
        password,
        username,
      });
      setModal(null);
      setUserName(username);

      navigate("/success");
      console.log("REGISTRO EXITOSO:", data);

      return data;

    } catch(error) {
      console.error("ERROR DEL REGISTRO:", error);
    }
  };

  const handleLoguin = async ({ email, password }) => {
    try {
      const data = await auth.authorize({
        email,
        password,
      });
      
      let token = data.token;

      if (!token) {
        navigate("/signin")
        throw new Error("No se recibió el token")        
      };

      localStorage.setItem("jwt", token);
      setToken(data.token);

      const userData = await auth.checkToken(token);
      setUserName(userData.username);

      
      const newsSaved = await api.getArticles();
      setSavedArticles(newsSaved);
      setIsLogin(true);
      setModal(null);
      navigate('/saved-news');  
    } catch(error) {
      setIsLogin(false);
      console.error("ERROR DE LOGIN", error);
    };
  };
  
  const handleSaveArticle = async (article) => {
    console.log("guandando");
    const articleToSave = {
      keyword,
      image: article.image,
      title: article.title,
      published_at: article.published_at,
      source: article.source,
      description: article.description,
      url: article.url,
    };

    try {
      const saveArticle = await api.saveArticle(articleToSave);
      console.log("guardando " + saveArticle)

      setSavedArticles((prev) => [
        ...prev,
        saveArticle,
      ])
    } catch(error) {
      console.error("Error al guardar el articulo:", error);
      setError(
        error?.message || "No fue posible guardar la noticia."
      );
    };
  };

  const handleDeleteArticle = async (articleId) => {
    try {
      await api.deleteArticle(articleId)

      setSavedArticles((prev) => {
        return prev.filter((article) => article._id !== articleId)
      })
    } catch(error) {
      console.error("Error al eliminar article:", error)
      setError(error?.message || "No fue posible eliminar la noticia.");
    }
  };

  function navigateToHome() {
    console.log("navegando a home")
    if (isLogin) {
      setIsLogin(true);
      setModal(null);
      return navigate('/home-save-news');
              
    } else {
      setModal(null);
      return navigate("/")
    }
    
  };

  function navigateToSavedNews() {
    if (isLogin) {
      setModal(null);
      setTitleWhite(false);
      setIsLogin(true);
      return navigate('/saved-news');
    } else {
      setModal(null);
      return navigate("/")
    }
  };

  function handleLogout() {
    localStorage.removeItem("jwt");
    setToken("");
    setSavedArticles([]);
    setIsLogin(false);
    setModal(null);
    setTitleWhite(false);
    setUserName("");
    navigate("/");
  };

  function handleCloseModal() {
    setModal(null);
    setTitleWhite(false);
    
    if (
        location.pathname === "/signin" ||
        location.pathname === "/signup" ||
        location.pathname === "/success"
    ) {
        navigate("/");
    }
  };

  const signIn = { 
    title: "Sign in",
    children: 
      <ModalSignIn 
        handleLoguin={handleLoguin}
        handleOpenModal={() => navigate("/signup")} />
  }

  const signUp = {
    title: "Sign up",
    children: 
      <ModalSignUp 
        handleRegister={handleRegister}
        handleOpenModal={() => navigate("/signin")} /> 
  }

  const registerfull = {
  title: "Registration successfully completed!",
          children: 
            <Registerffully 
              handleOpenModal={() => navigate("/signin")}
            />  
  }

  const phoneVistNoLogin = {
    title: "NewsExplorer",
    children: 
      <ModalPhoneVist
        isLogin={isLogin}
        navigateToHome={navigateToHome}
        navigateToSavedNews={navigateToSavedNews}
        handleCloseModal={handleCloseModal}
        handleLogout={handleLogout}
        handleOpenModal={
          () => {
            setModal(null);
            setTitleWhite(false);
            setIsLogin(false)
            navigate("/signin")
          }
        }/>
  }

  const phoneVistLogin = {
    title: "NewsExplorer",
    children: 
      <ModalPhoneVist  
        handleLogout={handleLogout}
        navigateToHome={navigateToHome}
        navigateToSavedNews={navigateToSavedNews}
        isLogin={isLogin}
        userName={userName}
      />
  }

  const routeModal = {
    "/signin": signIn,
    "/signup": signUp,
    "/success": registerfull,
  }[location.pathname] || null;

  const activeModal = routeModal || modal;



  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
  
    if(!jwt) return;
  
    auth.checkToken(jwt)
      .then((userData) => {
        setToken(jwt);
        setUserName(userData.username);
        return api.getArticles();
      })
      .then((data) => {
        setSavedArticles(data)
        setIsLogin(true)
      })
      .catch((error) => {
        localStorage.removeItem("jwt");
        setToken("");
        setSavedArticles([]);
        setIsLogin(false);
        navigate("/signin")
        console.error("Error al obtener usuario:", error);
      });
  }, [navigate]);

  useEffect(() => {
    if (location.pathname !== "/" || articles.length > 0) {
        return
    } else {
        api.searchNews() 
          .then((data) => {
          setArticles(data.data || []   )
        })
        .catch((err) => {
        console.error("Error al buscar noticias:", err);
        setError(
          err?.error?.message ||
          err?.message ||
          "No fue posible cargar las noticias."
        )});
      };
  }, [location.pathname]);

  useEffect(() => {
    function handleResize() {
      if(window.innerWidth > 800) {
        setModal(null);
        setTitleWhite(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function activeModalPhoneVist() {
      {isLogin ? setModal(phoneVistLogin) : setModal(phoneVistNoLogin)};
      setTitleWhite(true);
  }



  return (
    <div className="app">
      <NavBar 
        handleCloseModal={handleCloseModal}
        handleOpenModal={() => navigate("/signin")} 
        navigateToHome={navigateToHome}
        navigateToSavedNews={navigateToSavedNews}
        register={register}
        isHome={isHome}
        isLogin={isLogin}
        activeModalPhoneVist={activeModalPhoneVist}
        handleLogout={handleLogout}
        userName={userName}
      />


      <Routes>
        <Route 
          path="/" 
          element={ 
            <>

              <NewsSearch handleSearch={handleSearch}/>
              <NewsContext.Provider
                value={{
                  register,
                  isLogin,
                  keyword,
                  articles,
                  isLoading,
                  error,
                  isHome,
                  handleSaveArticle,
                  handleDeleteArticle
                }}  
              >
                <SearchNewsPage />
              </NewsContext.Provider>              
              <AboutAuthor aboutAuthor={aboutAuthor}/>
            </>
          }
        />
        <Route 
          path="/signin" 
          element={
            <>
                <NewsSearch handleSearch={handleSearch} />
                <AboutAuthor aboutAuthor={aboutAuthor} />
            </>
          }
          
        />
        <Route 
          path="/signup" 
          element={ 
            <Register 
              handleRegister={handleRegister}
            />
          }
        />
        <Route 
          path="/News" 
          element={
            <>
              <NewsSearch handleSearch={handleSearch}/>
              <NewsContext.Provider
                value={{
                  register,
                  isLogin,
                  keyword,
                  articles,
                  isLoading,
                  error,
                  isHome,
                  handleDeleteArticle,
                }}  
              >
              <SearchNewsPage />

            </NewsContext.Provider>
              <AboutAuthor aboutAuthor={aboutAuthor}/>
            </>
          }
        />
        <Route
          path="/home-save-news"
          element={
            <ProtectedRoute>
              <NewsSearch handleSearch={handleSearch}/>
              <NewsContext.Provider
                value={{
                  register,
                  isLogin,
                  keyword,
                  articles,
                  isLoading,
                  error,
                  isHome,
                  handleSaveArticle,
                  handleDeleteArticle,
                  userName
                }}  
              >
                <Home aboutAuthor={aboutAuthor}/>
              </NewsContext.Provider>
            </ProtectedRoute>
          }
        >

        </Route>
        <Route 
          path="/saved-news"  
          element={
            <NewsContext.Provider
              value={{
                register,
                savedArticles,
                keyword,
                error,
                handleSaveArticle,
                handleDeleteArticle,
                articles,
                isLogin,
                userName,
                isHome,
              }}  
            >
              <ProtectedRoute>
                <Protected />
              </ProtectedRoute>              
            </NewsContext.Provider>
          }/>
      </Routes>
      <Footer />
      {activeModal &&  (
        <Modal
          onClose={handleCloseModal}
          title={activeModal.title}
          titleWhite={titleWhite}
        >
            {activeModal.children}
        </Modal>
      )}
    </div>
  )
}

export  { App };
