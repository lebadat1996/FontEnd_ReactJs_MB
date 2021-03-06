import axios from "axios";
import {API_SERVICE_URL} from "../../helper/constant";
import {getCookie} from "../Auth-header";

const create = "api/banner/save";
const view = "api/banner/view";
const findById = "api/banner/getBannerById/";
const update = "api/banner/update/"
const remove = "api/banner/remove/"
const getAllChannel = "channel/getAll"

class BannerService {

    createBanner(body) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + create, body, config)
    }


    viewBanner(page, size) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + view + "?page=" + page + "&size=" + size, config)
    }

    getBannerById(bannerId) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + findById + bannerId, config)
    }

    updateBanner(body, id) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + update + id, body, config)
    }

    deleteBanner(id) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + remove + id, config)
    }

    getAllChannel() {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + getAllChannel, config)
    }
}

export default new BannerService();