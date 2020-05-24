// imports
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Auth
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

// Bootstrap
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

// Article page
import selectedArticle from "./components/learn/articles/SelectedArticle";
import PreviewPage from "./components/learn/preview/PreviewPage";

// Components
import Home from "./components/home/home";
import About from "./components/aboutUs/about";
import Learn from "./components/learn/learn";
// import Dashboard from "./components/adminPanel/Dashboard";
import Navbar from "./components/layout/Navbar/Navbar";
// import { AuthContext } from "./contexts/authContext";
import SpecialityContextProvider from "./contexts/specialityContext";
import AuthContextProvider from "./contexts/authContext";
import TopicsContextProvider from "./contexts/topicContext";
import ArticlesContextProvider from "./contexts/articleContext";
import HomeContextProvider from "./contexts/homeContext";
import EditHomepage from "./components/home/EDIT/editHomepage";
import EditCard from "./components/learn/learningCards/UpdateCard";
import AddCard from "./components/learn/learningCards/AddCard";
import AddArticle from "./components/learn/articles/addArticle";
import UpdateArticle from "./components/learn/articles/updateArticle";
import AdminPanel from "./components/adminPanel/adminPanel";

const App = () => {
  // const { authState } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <div className="App">
      <AuthContextProvider>
        <SpecialityContextProvider>
          <TopicsContextProvider>
            <ArticlesContextProvider>
              <HomeContextProvider>
                <Navbar />
                <AnimatePresence>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route exact path="/learn" component={Learn} />
                    <Route exact path="/signup" component={SignUp} />
                    <Route exact path="/signup/:referCode" component={SignUp} />
                    <Route path="/login" component={SignIn} />
                    <Route
                      exact
                      path="/:specialityId/:topicId/:Id"
                      component={selectedArticle}
                    />
                    <Route
                      exact
                      path="/learn/:specialityName"
                      component={PreviewPage}
                    />
                    <Route exact path="/adminpanel" component={AdminPanel} />
                    <Route
                      exact
                      path="/edit/homepage"
                      component={EditHomepage}
                    />
                    <Route
                      exact
                      path="/updatespeciality/:specailaityId"
                      component={EditCard}
                    />
                    <Route exact path="/addcard" component={AddCard} />
                    <Route
                      exact
                      path="/article/add/:SpecialityId/:id"
                      component={AddArticle}
                    />
                    <Route
                      exact
                      path="/article/update/:SpecialityId/:TopicId/:ArticleId"
                      component={UpdateArticle}
                    />
                  </Switch>
                </AnimatePresence>
              </HomeContextProvider>
            </ArticlesContextProvider>
          </TopicsContextProvider>
        </SpecialityContextProvider>
        </AuthContextProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
