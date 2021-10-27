import {getCookie} from "../Auth-header";
import axios from "axios";
import {API_SERVICE_URL} from "../../helper/constant";

const create = "api/post/save";
const view = "api/post/view";
const findById = "api/post/getPostById/";
const update = "api/post/update/";
const remove = "api/post/remove/";
const getAllCategory = "api/post/getAllCategory"

class PostService {

    createPost(body) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + create, body, config)
    }


    viewPost(page, size) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + view + "?page=" + page + "&size=" + size, config)
    }

    getPostById(popupId) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + findById + popupId, config)
    }

    updatePost(body, id) {
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.post(API_SERVICE_URL + update + id, body, config)
    }

    deletePost(id) {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + remove + id, config)
    }

    getAllCategory() {
        const config = {
            headers: {
                "Authorization": `Bearer ` + getCookie("JSESSIONID")
            }
        }
        return axios.get(API_SERVICE_URL + getAllCategory, config)
    }
}

export default new PostService();