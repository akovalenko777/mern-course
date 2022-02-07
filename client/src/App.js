import React from "react";
import 'materialize-css';
import { BrowserRouter as Router} from "react-router-dom";
import useRoutes from "./routes.js";
import useAuth from "./hooks/auth.hook.js";
import AuthContext from "./context/AuthContext.js";
import Navbar from './components/Navbar';
import Loader from './components/Loader';

function App() {
  const {login, logout, token, userId, ready} = useAuth();
  const isAuth = !!token;
  const routes = useRoutes(isAuth);
  
  if(!ready){
    return <Loader />
  }
  return (
    <AuthContext.Provider value={{token, userId, login, logout, isAuth}}>
      <Router>
      {isAuth && <Navbar />}
      <div className="container">
          {routes}
      </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
