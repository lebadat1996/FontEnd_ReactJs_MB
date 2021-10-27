import React, {Component} from 'react';
import {Pagination} from "antd";
import PopupService from "../../service/PopupService/PopupService";

class PopupView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popups: [],
            totalElements: 0,
            numberOfElements: 0,
            pageIndex: 1,
            size: 5
        }
    }

    componentDidMount() {
        PopupService.viewPopup(this.state.pageIndex, this.state.size).then((res) => {
            debugger
            console.log(res.data.content)
            this.setState({popups: res.data.content});
            this.setState({totalElements: res.data.totalElements})
            this.setState({numberOfElements: res.data.numberOfElements})
            this.setState({pageIndex: res.data.number})
        });
    }

    changePage = (page, size) => {
        PopupService.viewPopup(page, size).then((res) => {
            console.log(res);
            this.setState({popups: res.data.content});
            this.setState({totalElements: res.data.totalElements})
            this.setState({numberOfElements: res.data.numberOfElements})
            this.setState({pageIndex: res.data.number})

        });

    }
    createPopup = () => {
        this.props.history.push("/create/popup/")
    }
    editPopup = (id) => {
        this.props.history.push("/edit/popup/" + id)
    }

    deletePopup(id) {
        PopupService.deletePopup(id).then(res => {
            this.setState({popups: this.state.popups.filter(popup => popup.id !== id)});
            alert("Xóa Pop-up Thành công")
        });
    }

    render() {
        return (
            <div className="list-data-demo">
                <div className="list-banner-title">
                    <h2><p>Quản lý Pop-up</p></h2>
                </div>
                <div className="add-list">
                    <button onClick={() => this.createPopup()}>Thêm mới</button>
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
                        <div className="title-list-item title-item-mull"><p>Hành Động</p></div>
                    </div>
                    {
                        this.state.popups.map(
                            popup => <div className="content-list">
                                <div className="content-list-item content-item-checkbox">
                                    <div><input type="checkbox"/></div>
                                </div>
                                <div className="content-list-item content-item-status"><p>{popup.id}</p></div>
                                <div className="content-list-item content-item-title"><p>{popup.alternative_title}</p>
                                </div>
                                <div className="content-list-item content-item-active"><p>{popup.status}</p></div>
                                <div className="content-list-item content-item-channel"><p>{popup.channel_id}</p></div>
                                <div className="content-list-item content-item-actions">
                                    <div className="content-item-button">
                                        <button className="edit" onClick={() => this.editPopup(popup.id)}>Sửa</button>
                                        <button className="delete" onClick={() => this.deletePopup(popup.id)}>Xóa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    <div className="banner-view-page">
                        <Pagination
                            total={this.state.totalElements}
                            onChange={this.changePage}
                            pageSize={this.state.size}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default PopupView;