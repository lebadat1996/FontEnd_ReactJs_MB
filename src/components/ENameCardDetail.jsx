import React from 'react';
import ENameCardService from "../service/ENameCardService";
import "./ENameCardDetail.css"
import avatar from "../assets/avatar.png";
import {images} from "../images";
import {imagesAvatar} from "../images"
import {getCookie} from "../service/Auth-header";
import {roleAdmin} from "../helper/constant";


export class ENameCardDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            nameCard: {},
            qrCode: '',
            byteArrayQR: {},
            linkFacebook: '',
            linkZalo: '',
            avatar: '',
            file: ''
        }
        this.viewDetail(this.state.id)


        this.viewQRCode(this.state.id);
    }

    viewQRCode(id) {
        ENameCardService.downloadQRCode(id).then((res) => {
            this.setState({byteArrayQR: res.data})
            const base64 = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            )
            this.setState({qrCode: "data:image/png;base64," + base64})
        })
    }

    viewAvatar(e) {
        const file = e.target.files[0];
        const preview = document.getElementById('viewAvatarP');
        const render = new FileReader();
        debugger
        if (e.target.result !== undefined) {
            render.onload = function (e) {
                // @ts-ignore
                preview.setAttribute('src', e.target.result);
            };
        } else {
            render.onload = function (e) {
                // @ts-ignore
                if (preview !== null) {
                    preview.setAttribute('src', avatar);
                }
            };
        }
        render.readAsDataURL(file);
        ENameCardService.updateAvatar(file).then((res) => {
        })
        alert("update image successful");
    }


    viewDetail(id) {
        ENameCardService.viewDetail(id).then((res) => {
            debugger
            this.setState({nameCard: res.data.data});
            if (res.data.data.avatar !== null) {
                this.setState({avatar: res.data.data.avatar});
            }
            console.log(imagesAvatar)
            this.handleLinkSocialMedia(res.data.data);
        })
    }


    handleLinkSocialMedia(nameCard) {
        console.log(nameCard.faceBookLink);
        const platForm = navigator.userAgent.toString();
        let linkFb = '';
        let baseLinkAPK = "fb://facewebmodal/f?href=";
        let baseLinkIOS = "fb://profile?id=";
        let baseLinkZalo = "https://zalo.me/";
        let baseOriginalLinkFbPhp = "https://www.facebook.com/profile.php?id=";
        let baseOriginalLinkFb = "https://www.facebook.com/";

        let originalLinkFB = nameCard.faceBookLink;

        if (platForm.includes("Android")) {
            linkFb = baseLinkAPK.concat(originalLinkFB);
        } else if (platForm.includes("IOS")) {
            if (originalLinkFB.includes(baseOriginalLinkFbPhp)) {
                linkFb = baseLinkIOS + originalLinkFB.substring(baseOriginalLinkFbPhp.length, originalLinkFB.length);
            } else {
                linkFb = baseLinkIOS + originalLinkFB.substring(baseOriginalLinkFb.length, originalLinkFB.length);
            }
        } else {
            linkFb = originalLinkFB;
        }
        this.setState({linkFacebook: linkFb, linkZalo: baseLinkZalo + nameCard.phone})
    }

    downloadQRCode() {
        const url = window.URL.createObjectURL(new Blob([this.state.byteArrayQR]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qr.png');
        document.body.appendChild(link);
        link.click();
    }

    redirectFB = () => {
        // window.open('fb://facewebmodal/f?href=https://www.facebook.com/profile.php?id=100014529732951')
        window.open(this.state.linkFacebook)
    }

    redirectZalo = () => {
        // window.open('https://zalo.me/0984945109')
        window.open(this.state.linkZalo)
    }

    callPhone = () => {
        window.open('tel:' + this.state.nameCard.phone);
    }

    setUpSendMail = () => {
        window.open('mailto:' + this.state.nameCard.email + "?subject=hello ae");
    }

    render() {
        const {avatar, email, faceBookLink, fullName, id, phone, positions} = this.state.nameCard


        const linkAPK = "fb://facewebmodal/f?href=https://www.facebook.com/Kxuynee";
        const linkIOS = "fb://profile?id=bon.trainer"
        const linkZalo = "https://zalo.me/0984945109"
        let avatarElement;
        let roleName = getCookie("ROLE_NAME");
        if (roleName === roleAdmin) {
            if (avatar !== undefined && avatar != null) {
                avatarElement = <div className="column-d">
                    <img src={imagesAvatar[avatar].default} style={{"width": "200px", "height": "200px"}}/>
                    <label style={{"margin-left": "25%"}}>Ảnh cá nhân </label>
                </div>
            } else {
                avatarElement = <div className="column-d">
                    <img src={images[`avatar.png`].default} style={{"width": "200px", "height": "200px"}}/>
                    <label style={{"margin-left": "25%"}}>Ảnh cá nhân </label>
                </div>
            }
        } else {
            if (avatar !== undefined && avatar != null) {
                avatarElement = <div className="column-d">
                    {/*<img src={images[`avatar.png`].default} style={{"width":"200px" ,"height":"200px"}} id="viewAvatarP"/>*/}
                    <img src={imagesAvatar[avatar].default} style={{"width": "200px", "height": "200px"}}/>
                    <input type="file" onChange={this.viewAvatar}/>
                    <label style={{"margin-left": "25%"}}>Ảnh cá nhân </label>
                </div>
            } else {
                avatarElement = <div className="column-d">
                    <img src={images[`avatar.png`].default} style={{"width": "200px", "height": "200px"}}/>
                    <input type="file" onChange={this.viewAvatar}/>
                    <label style={{"margin-left": "25%"}}>Ảnh cá nhân </label>
                </div>
            }
        }
        return (
            <div>
                <div className="modal-content">
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="column-layout">
                                    <div className="row-d">
                                        <div className="column-d">
                                            <div className="row-d">
                                                {avatarElement}
                                                <div className="column-d">
                                                    <div style={{"margin-top": "30%"}}>
                                                        <h3>{fullName}</h3>
                                                        <label>Chức vụ : {positions}</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column-d">
                                            <div>
                                                <img src={this.state.qrCode}
                                                     style={{"width": "200px", "height": "200px"}}/>
                                                <div className="qr-i">
                                                    <img src={images[`share.png`].default} width={40} height={40}/>
                                                    <img src={images[`download.png`].default} width={40} height={40}
                                                         onClick={() => this.downloadQRCode()}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row-d">
                                        <div className="column-d">
                                            <div className="column-d">
                                                <div className="element">
                                                    <img src={images[`phone.png`].default} width={40} height={40}
                                                         onClick={this.callPhone}/>
                                                    <label>{phone}</label>
                                                </div>
                                            </div>
                                            <div className="column-d">
                                                <div className="element">
                                                    <img src={images[`mail.png`].default} width={40} height={40}
                                                         onClick={this.setUpSendMail}/>
                                                    <label>{email}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column-d">
                                            <div className="element-m">
                                                <label>Mạng xã hội: </label>
                                                <div>
                                                    <img src={images[`zalo.png`].default} width={40} height={40}
                                                         onClick={this.redirectZalo}/>
                                                </div>
                                                <div>
                                                    <img src={images[`fb.jpg`].default} width={40} height={40}
                                                         onClick={this.redirectFB}/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

