import axios from "axios";
import authHeader, { deleteAllCookies, getCookie} from "./Auth-header";
import {E_NAME_CARD_API_BASE_URL} from "../helper/constant";
 export class AuthService {
    login(username, password) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

            }
        }

        return axios
            .post(E_NAME_CARD_API_BASE_URL + "/account/login", {
                username,
                password
            },config)
    }

    changePassword(changePasswordRequest){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization : `Bearer `+ getCookie("JSESSIONID"),
                'Accept-Encoding': 'gzip, deflate, br',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"

            }
        }
        return axios.put(E_NAME_CARD_API_BASE_URL + "/account/password",changePasswordRequest,config).catch(function (error){
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

     forgotPassword(username){
         const config = {
             headers: {
                 Authorization : `Bearer `+ getCookie("JSESSIONID"),
             }
         }
         return axios.put(E_NAME_CARD_API_BASE_URL + "/account/password-mail",username,config)
     }


    logout() {
        return axios.post(E_NAME_CARD_API_BASE_URL + "/account/logout",null,{ headers: authHeader() });
    }

 }

export default new AuthService()

