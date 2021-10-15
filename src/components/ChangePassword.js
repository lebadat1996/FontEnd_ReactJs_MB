import { Form, Input, Button } from 'antd';
import React from "react";
import AuthService from "../service/AuthService";

export const ChangePassword = () => {
    const onFinish = (values) => {
        if (values.newPassword === values.retypePassword){

            let changePasswordRequest = {
                newPassword: values.newPassword,
                oldPassword: values.oldPassword
            }
            AuthService.changePassword(changePasswordRequest).then((res) => {
                alert("change password successful")
            }).catch(function (error){
                alert(error.response.data.error)
            })
        }else {
            alert("Mật khẩu mới và mật khẩu nhập lại không trùng nhau!")
        }
    };

    const onFinishFailed = (errorInfo) => {
        alert("tồn tại trường dữ liệu không đúng!")
    };

    const center =  {
        margin: "auto",
        width: "60%",
    }

    return (

       <div style={center}>
           <h2 className="text-center">Thay đổi mật khẩu</h2>
           <Form
               name="basic"
               labelCol={{
                   span: 8,
               }}
               wrapperCol={{
                   span: 16,
               }}
               initialValues={{
                   remember: true,
               }}
               onFinish={onFinish}
               onFinishFailed={onFinishFailed}
               autoComplete="off"
           >
               <Form.Item
                   label="Old password"
                   name="oldPassword"
                   rules={[
                       {
                           required: true,
                           message: 'old password is invalid!',
                       },
                   ]}
               >
                   <Input.Password />
               </Form.Item>

               <Form.Item
                   label="New password"
                   name="newPassword"
                   rules={[
                       {
                           required: true,
                           message: 'new password is invalid!',
                       },
                   ]}
               >
                   <Input.Password />
               </Form.Item>

               <Form.Item
                   label="Retype password"
                   name="retypePassword"
                   rules={[
                       {
                           required: true,
                           message: 'retype password is invalid',
                       },
                   ]}
               >
                   <Input.Password />
               </Form.Item>

               <Form.Item
                   name="remember"
                   valuePropName="checked"
                   wrapperCol={{
                       offset: 8,
                       span: 16,
                   }}
               >
               </Form.Item>

               <Form.Item
                   wrapperCol={{
                       offset: 8,
                       span: 16,
                   }}
               >
                   <Button type="primary" htmlType="submit">
                       Submit
                   </Button>
               </Form.Item>
           </Form>
       </div>
    );
};
