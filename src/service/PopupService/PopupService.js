import {getCookie} from "../Auth-header";
import axios from "axios";
import {API_SERVICE_URL} from "../../helper/constant";

const create = "api/popup/save";
const view = "api/popup/view";
const findById = "api/popup/getPopupById/";
const update = "api/popup/update/"
const remove = "api/popup/remove/"

class PopupService {

    createPopup(body) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + create, body, config)
    }


    viewPopup(page, size) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + view + "?page=" + page + "&size=" + size, config)
    }

    getPopupById(popupId) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + findById + popupId, config)
    }

    updatePopup(body, id) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + update + id, body, config)
    }

    deletePopup(id) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + remove + id, config)
    }
}

export default new PopupService();