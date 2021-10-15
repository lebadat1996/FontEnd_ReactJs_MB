import {roleAdmin} from "../helper/constant";
import {AuthService} from "./AuthService";

export default function authHeader() {
    let token = getCookie("JSESSIONID");
    if (token) {
        return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

export function authHeaderString() {
    let token = getCookie("JSESSIONID");
    if (token) {
        return token;
    } else {
        return null;
    }
}


export function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function deleteAllCookies() {
    let cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        let eqPos = cookie.indexOf("=");
        let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export function checkRole() {
    let role = getCookie("ROLE_NAME")
    if (role !== roleAdmin) {
        let authService = new AuthService();
        authService.logout();
        deleteAllCookies();
        window.location.href = "/login";
    }
}
