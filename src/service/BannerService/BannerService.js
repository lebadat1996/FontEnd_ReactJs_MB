import axios from "axios";
import {API_BANNER_URL} from "../../helper/constant";
import {getCookie} from "../Auth-header";

const create = "api/banner/save";
const view = "api/banner/view";
const findById = "api/banner/getBannerById/";
const update = "api/banner/update/"
const remove ="api/banner/remove/"
class BannerService {

    createBanner(body) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_BANNER_URL + create, body, config)
    }


    viewBanner() {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_BANNER_URL + view, config)
    }

    getBannerById(bannerId) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_BANNER_URL + findById + bannerId, config)
    }

    updateBanner(body, id) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_BANNER_URL + update + id, body, config)
    }

    deleteBanner(id){
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_BANNER_URL + remove + id, config)
    }
}

export default new BannerService();