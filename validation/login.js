const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateLoginData(userData){
    let errors = {}
    userData.email = !isEmpty(userData.email) ? userData.email : "";
    userData.password = !isEmpty(userData.password) ? userData.password : "";

    if(Validator.isEmpty(userData.email)){
        errors.email = "Email is required";
    } else if(!Validator.isEmail(userData.email)){
        errors.email = "Email is invalid"
    } 
    if(Validator.isEmpty(userData.password)){
        errors.password = "password field is required"
    }

    return {
        errors,
        isValid:isEmpty(errors)
    }
}
