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
function App() {

    let login = <div>
        <Router>
            <div >
                <Switch>
                    <Route path = "/login" exact component = {LoginComponent}></Route>
                    <Route path= "/forgot-password" component={ForgotPassword}></Route>
                </Switch>
            </div>
        </Router>
    </div>

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
