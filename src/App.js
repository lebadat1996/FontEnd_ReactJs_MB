import './App.css';
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import React from "react";
import ENameCardView from "./components/ENameCardView";
import ENameCardCreate from "./components/ENameCardCreate";
import {ENameCardDetail} from "./components/ENameCardDetail";
import {LoginComponent} from "./components/login/LoginComponent";
import {ChangePassword} from "./components/ChangePassword";
import {ForgotPassword} from "./components/ForgotPassword";
import {getCookie} from "./service/Auth-header";
import ENameCardEdit from "./components/ENameCardEdit";
import BannerView from "./components/BannerComponent/BannerView";
import Banner from "./components/BannerComponent/Banner";
import EditBanner from "./components/BannerComponent/EditBanner";
import PopupCreate from "./components/PopupComponent/PopupCreate";
import PopupView from "./components/PopupComponent/PopupView";
import PopupEdit from "./components/PopupComponent/PopupEdit";
import PostCreate from "./components/PostComponent/PostCreate";
import PostView from "./components/PostComponent/PostView";
import PostEdit from "./components/PostComponent/PostEdit";
function App() {
    let main = <div>
        <HeaderComponent/>
        <Router>
            <div className="container">
                <Switch>
                    <Route path = "/login" exact component = {LoginComponent}></Route>
                    <Route path= "/forgot-password" component={ForgotPassword}></Route>
                    {/*<Route path = "/" exact component = {ENameCardView}></Route>*/}
                    <Route path = "/" exact component = {BannerView}></Route>
                    <Route path = "/create/banner/" exact component = {Banner}></Route>
                    <Route path = "/edit/banner/:id" exact component = {EditBanner}></Route>
                    <Route path = "/view/banner/" exact component = {BannerView}></Route>
                    <Route path = "/login" exact component = {LoginComponent}></Route>
                    <Route path = "/name-cards" component = {ENameCardView}></Route>
                    <Route path = "/name-card/add" component = {ENameCardCreate}></Route>
                    <Route path = "/name-card/edit/:id" component = {ENameCardEdit}></Route>
                    <Route path = "/name-card/detail/:id" component = {ENameCardDetail}></Route>
                    <Route path= "/change-password" component={ChangePassword}></Route>
                    <Route path= "/create/popup/" component={PopupCreate}></Route>
                    <Route path= "/edit/popup/:id" component={PopupEdit}></Route>
                    <Route path= "/view/popup/" component={PopupView}></Route>
                    <Route path= "/create/post/" component={PostCreate}></Route>
                    <Route path= "/view/post/" component={PostView}></Route>
                    <Route path= "/edit/post/:id" component={PostEdit}></Route>
                </Switch>
            </div>
        </Router>
        {/*<FooterComponent/>*/}
    </div>

    let username = getCookie("USERNAME");
    // if (username){
    //     return main
    // }else {
    //     return login
    // }
    return main

}

export default App;
