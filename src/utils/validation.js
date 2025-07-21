export const validateEmail = (email) => {
    let pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const check = email.match(pattern);
    if(check){
        return true;
    }
    else{
        return false;
    }
}

export const validatePassword = (password) => {
    if(password.length <= 4) {
        return false;
    }
    else{
        return true;
    }
}

export const validatePhoneNumber = (phone_number) => {
    let pattern = /^[6-9]{1}[0-9]{9}$/;
    const check = phone_number.match(pattern);
    if(check){
        return {
            status: true,
            message: 'Success'
        }
    }
    else{
        return {
            status: false,
            message: 'Failed'
        }
    }
}