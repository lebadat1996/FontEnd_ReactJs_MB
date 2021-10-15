import React, {Component} from 'react';
import AuthService from "../service/AuthService";
import {deleteAllCookies,getCookie} from "../service/Auth-header"

class HeaderComponent extends Component {

    constructor(props) {
        super(props);
    }

    backHome(e){
        window.location.href="/name-cards";
    }

    logout(){
        AuthService.logout();
        deleteAllCookies();
        window.location.href="/login";
    }

    render() {


        let button ;
        let username = getCookie("USERNAME");
        let changePassword ;
        if (username){
            button = <button  className="btn btn-info" onClick={this.logout}>
                <span className="glyphicon glyphicon-log-out"></span> Logout
            </button>
            changePassword = <button  className="btn btn-info" onClick={() => window.location.href="/change-password"}>
                <span className="glyphicon glyphicon-log-out"></span> change Password
            </button>
        }else {
            let urlLogin = window.location.href;
            if (!urlLogin.includes("/login")){
                button = <button  className="btn btn-info" onClick={() => window.location.href="/login"}>
                    <span className="glyphicon glyphicon-log-out"></span> login
                </button>
            }
        }

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><p className="navbar-brand" onClick={this.backHome}>E-NameCard </p></div>
                            <div style={{"margin-left":"60%"}}>
                                {button}
                                {changePassword}
                            </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;
