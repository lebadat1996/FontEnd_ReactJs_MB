import React from "react";

let patternSpecialCharacter = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~0-9]/;
let patternPhone = /(0[3|5|7|8|9])+([0-9]{8}$)|(84[3|5|7|8|9])+([0-9]{8}$)/g;
export let patternMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let patternProfileFacebook = /^(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/

export const validProfileFacebook = (value) => {
    if (!value) {
        return <Required/>
    }else if (!value.toString().match(patternProfileFacebook)){
        return (
            <div className="alert alert-danger" role="alert">
                this facebook link is incorrect format!
            </div>
        )
    }
}

export const validMail = (value) => {
    if (!value) {
        return <Required/>
    }else if (!value.toString().match(patternMail)){
       return <div className="alert alert-danger" role="alert">
            this email address is incorrect format!
        </div>
    }
}

export const validFullName = (value) => {
    if (!value) {
        return (
            <div>
                <Required/>
            </div>
        );
    }else if (value.toString().match(patternSpecialCharacter)) {
        return <ExistSpecialCharacter/>
    }
};

export const ExistSpecialCharacter = () => {
        return (
            <div className="alert alert-danger" role="alert">
                this field does not contain special characters!
            </div>
        );
}

export const Required = () => {
    return (
        <div className="alert alert-danger" role="alert">
            This field is required!
        </div>
    );
}

export const validPhone = (value) => {
    if (!value) {
        return <Required/>
    }else if (!value.toString().match(patternPhone)){
        return (
            <div className="alert alert-danger" role="alert">
                the phone number is incorrect format!
            </div>
        )
    }
}

