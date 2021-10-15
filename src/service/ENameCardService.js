import axios from 'axios';
import authHeader, {getCookie, deleteAllCookies} from "./Auth-header";
import {E_NAME_CARD_API_BASE_URL} from "../helper/constant"


const eNameCardUrl = "/e-name-card"

class ENameCardService {

    getENameCard(page,size){
        return axios.get(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "?page=" + page +  "&" + "size=" + size,{ headers: authHeader() })
            .catch(function (error) {
            console.log(error)
        })
    }

    createEmployee(eNameCard){
        return axios.post(E_NAME_CARD_API_BASE_URL + eNameCardUrl, eNameCard,{ headers: authHeader() }).catch(function (error) {
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

    updateCard(eNameCard){
        return axios.put(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/" + eNameCard.id , eNameCard,{ headers: authHeader() }).catch(function (error) {
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

    uploadFile(file){
        const formData = new FormData();
        console.log("file" ,file);
        formData.append("file",file,file.name)
        return axios.post(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/batch" ,formData,{ headers: authHeader() }).catch(function (error) {
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        })
    }

    uploadAvatar(file){
        const formData = new FormData();
        formData.append("file",file,file.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer `+ getCookie("JSESSIONID")
            }
        }
        return axios.post(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/avatar" ,formData,config)
            .catch(function (error){
                if (error.response.status === 401){
                    deleteAllCookies();
                    window.location.href = '/login'
                }
            })
    }

    updateAvatar(file){
        const formData = new FormData();
        formData.append("file",file,file.name)
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization" : `Bearer `+ getCookie("JSESSIONID")
            }
        }
        return axios.put(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/avatar" ,formData,config)
            .catch(function (error){
                if (error.response.status === 401){
                    deleteAllCookies();
                    window.location.href = '/login'
                }
            })
    }

    downloadFile() {
        return axios.get(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/excel",{
            headers:
                {
                    'Content-Disposition': "attachment; filename=template.xlsx",
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    "Authorization" : `Bearer `+ getCookie("JSESSIONID")
                },
            responseType: 'arraybuffer',
        }).catch(function (error) {
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

    viewDetail(id) {
        return axios.get(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/" + id,{headers : authHeader()}).catch(function (error) {
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

    downloadQRCode(id){
        return axios.get(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/qr-code/" + id,{
            headers:
                {
                    'Content-Disposition': "attachment",
                    'Content-Type': 'image/png',
                    "Authorization" : `Bearer `+ getCookie("JSESSIONID")
                },
            responseType: 'arraybuffer',
        }).catch(function (error){
            debugger
            if (error.response.status === 401){
                deleteAllCookies();
                window.location.href = '/login'
            }
        });
    }

    delete(id){
        return axios.delete(E_NAME_CARD_API_BASE_URL + eNameCardUrl + "/" + id,{headers : authHeader()})
            .catch(function (error){
                if (error.response.status === 401){
                    deleteAllCookies();
                    window.location.href = '/login'
                }
            });
    }

}

export default new ENameCardService()
