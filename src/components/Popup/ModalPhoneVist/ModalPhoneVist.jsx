import iconLogout from "../../../assets/logout.png";
import iconLogounBlack from "../../../assets/logout.svg"


function ModalPhoneVist({handleOpenModal, navigateToHome, navigateToSavedNews, isLogin, isHome, handleLogout, userName}) {


    return ( 
        <div className="phoneVist">
            <div className="phoneVist__container">
                <button
                    className="phoneVist__button"
                    type="button" 
                    value="Home"
                    onClick={navigateToHome}
                    >
                    Home
                </button>
            </div>
            {isLogin ?
                <button
                    className="phoneVist__button phoneVist__button-savedArticle"
                    type="button" 
                    onClick={navigateToSavedNews}    
                    >Saved article
                </button> :
                <button 
                    className="phoneVist__button-signIn"  
                    type="button" 
                    value="Sign In"
                    onClick={handleOpenModal}
                    >Sign in 
                </button>
            }

            {isLogin && 
                <button 
                    className={ isLogin ? "phoneVist__button phoneVist___button-logout" : "phoneVist__button-logout-darck-style"} 
                    type="button"  
                    onClick={handleLogout}    
                >{userName}
                    <img className="phoneVist___button-logout-ion" src={isLogin && isHome ? iconLogout : iconLogounBlack} />
                </button>
            }
        </div>
     );
}

export {ModalPhoneVist};