const User 			= require('./../models').User;
const Member        = require('./../models').Member;
const validator     = require('validator');

const getUniqueKeyFromBody = function(body){// this is so they can send in 3 options unique_key, email, or phone and it will work
    let unique_key = body.unique_key;
    if(typeof unique_key==='undefined'){
        if(typeof body.email != 'undefined'){
            unique_key = body.email
        }else if(typeof body.phone != 'undefined'){
            unique_key = body.phone
        }else{
            unique_key = null;
        }
    }

    return unique_key;
}
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const createUser = async function(userInfo){
    let member, err;


    if(!userInfo.first_name) TE("A first name was not entered.");
    if(!userInfo.last_name) TE("A last name was not entered.");
    if(!userInfo.email) TE("An email was not entered.");
    if(!userInfo.password) TE("A password was not entered.");

    if(!validator.isLength(userInfo.first_name, {min: 3, max: 50})) TE("A valid first name was not entered.");
    if(!validator.isLength(userInfo.last_name, {min: 3, max: 50})) TE("A valid last name was not entered.");
    if(!validator.isEmail(userInfo.email)) TE("A valid email was not entered.");
    if(!validator.isLength(userInfo.password, {min: 8, max: 50})) TE("A valid password was not entered.");

    // input sanitization - only enter what's required.
    const { first_name, last_name, email, password } = userInfo;
    const accountInfo = {
        first_name,
        last_name,
        email,
        password,
        account_type: 'i'
    };

    [err, member] = await to(Member.create(accountInfo));
    if(err) TE(err.message);

    return member;
    
}
module.exports.createUser = createUser;

const authUser = async function(userInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(userInfo);

    if(!unique_key) TE('Please enter an email or phone number to login');


    if(!userInfo.password) TE('Please enter a password to login');

    // let user;
    if(userInfo.email){
    //     auth_info.method='email';

        [err, user] = await to(User.findOne({email:userInfo.email }));
        if(err) TE(err.message);

    // }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
    //     auth_info.method='phone';

    //     [err, user] = await to(User.findOne({phone:unique_key }));
    //     if(err) TE(err.message);

    }else{
        TE('A valid email was not entered');
    }

    if(!userInfo.password) TE('No password provided.')
    if(!user) TE('Not registered');

    [err, user] = await to(user.comparePassword(userInfo.password));

    if(err) TE(err.message);

    return user;

}
module.exports.authUser = authUser;