import React, {Component} from 'react';
import BannerService from "../../service/BannerService/BannerService";


class BannerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: []
        }
        this.deleteBanner = this.deleteBanner.bind(this);
    }

    componentDidMount() {
        BannerService.viewBanner().then((res) => {
            console.log(res.data)
            this.setState({banners: res.data});
        });
    }

    createBanner = () => {
        this.props.history.push("/create/banner/")
    }
    editBanner = (id) => {
        this.props.history.push("/edit/banner/" + id)
    }

    deleteBanner(id) {
        BannerService.deleteBanner(id).then(res => {
            this.setState({banners: this.state.banners.filter(banner => banner.id !== id)});
            alert("Xóa Banner Thành công")
        });
    }

    render() {
        return (
            <div className="list-data-demo">
                <div className="list-banner-title">
                    <h2><p>Quản lý Banner</p></h2>
                </div>
                <div className="add-list">
                    <button onClick={() => this.createBanner()}>Thêm mới</button>
                </div>
                <div className="form-list-banner">
                    <div className="title-list">
                        <div className="title-list-item title-item-checkbox">
                            <div><input type="checkbox"/></div>
                        </div>
                        <div className="title-list-item title-item-status"><p>STT</p></div>
                        <div className="title-list-item title-item-title"><p>Tiêu đề</p></div>
                        <div className="title-list-item title-item-active"><p>Trạng thái</p></div>
                        <div className="title-list-item title-item-channel"><p>Kênh</p></div>
                        <div className="title-list-item title-item-order"><p>Mức ưu tiên</p></div>
                        <div className="title-list-item title-item-mull"><p>Hành Động</p></div>
                    </div>
                    {
                        this.state.banners.map(
                            banner => <div className="content-list">
                                <div className="content-list-item content-item-checkbox">
                                    <div><input type="checkbox"/></div>
                                </div>
                                <div className="content-list-item content-item-status"><p>{banner.id}</p></div>
                                <div className="content-list-item content-item-title"><p>{banner.alternative_title}</p>
                                </div>
                                <div className="content-list-item content-item-active"><p>{banner.status}</p></div>
                                <div className="content-list-item content-item-channel"><p>{banner.channel_id}</p></div>
                                <div className="content-list-item content-item-order"><p>{banner.priority}</p></div>
                                <div className="content-list-item content-item-actions">
                                    <div className="content-item-button">
                                        <button className="edit" onClick={() => this.editBanner(banner.id)}>Sửa</button>
                                        <button className="delete" onClick={() => this.deleteBanner(banner.id)}>Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        );
    }
}

export default BannerView;