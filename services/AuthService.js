const Member 			= require('./../models').Member;
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


const createMember = async function(memberInfo){
    let member, err;

    if(!memberInfo.first_name) TE("A first_name was not entered.");
    if(!memberInfo.last_name) TE("A last_name was not entered.");
    if(!memberInfo.email) TE("A email was not entered.");
    if(!memberInfo.password) TE("password were not entered.");

    if(memberInfo.first_name && !validator.isLength(memberInfo.first_name, {min: 3, max: 50})) TE("A valid first_name was not entered.");
    if(memberInfo.last_name && !validator.isLength(memberInfo.last_name, {min: 3, max: 280})) TE("A valid last_name was not entered.");
    if(!validator.isEmail(memberInfo.email)) TE("A valid email was not entered.");
    if(!validator.isLength(memberInfo.password, {min: 8, max: 50})) TE("A valid password was not entered.");

//     // input sanitization - only enter what's required.
const { first_name, last_name, email, password } = memberInfo;
const newMember = {
    first_name,
    last_name,
    email,
    password,
    account_type: 'i'
};


    [err, member] = await to(Member.create(newMember));
    if(err) TE(err.message);

    return member;
}
module.exports.createMember = createMember;

// const createMember = async function(memberInfo){
//     let member, err;


//     if(!memberInfo.first_name) TE("A first name was not entered.");
//     if(!memberInfo.last_name) TE("A last name was not entered.");
//     if(!memberInfo.email) TE("An email was not entered.");
//     if(!memberInfo.password) TE("A password was not entered.");

//     if(!validator.isLength(memberInfo.first_name, {min: 3, max: 50})) TE("A valid first name was not entered.");
//     if(!validator.isLength(memberInfo.last_name, {min: 3, max: 50})) TE("A valid last name was not entered.");
//     if(!validator.isEmail(memberInfo.email)) TE("A valid email was not entered.");
//     if(!validator.isLength(memberInfo.password, {min: 8, max: 50})) TE("A valid password was not entered.");

//     // input sanitization - only enter what's required.
//     const { first_name, last_name, email, password } = memberInfo;
//     const accountInfo = {
//         first_name,
//         last_name,
//         email,
//         password,
//         account_type: 'i'
//     };

//     [err, member] = await to(Member.create(accountInfo));
//     if(err) TE(err.message);

//     return member;
    
// }
// module.exports.createMember;

const authMember = async function(memberInfo){//returns token
    let unique_key;
    let auth_info = {};
    auth_info.status = 'login';
    unique_key = getUniqueKeyFromBody(memberInfo);

    if(!unique_key) TE('Please enter an email or phone number to login');


    if(!memberInfo.password) TE('Please enter a password to login');

    // let member;
    if(memberInfo.email){
    //     auth_info.method='email';

        [err, member] = await to(Member.findOne({email:memberInfo.email }));
        if(err) TE(err.message);

    // }else if(validator.isMobilePhone(unique_key, 'any')){//checks if only phone number was sent
    //     auth_info.method='phone';

    //     [err, member] = await to(Member.findOne({phone:unique_key }));
    //     if(err) TE(err.message);

    }else{
        TE('A valid email was not entered');
    }

    if(!memberInfo.password) TE('No password provided.')
    if(!member) TE('Not registered');

    [err, member] = await to(member.comparePassword(memberInfo.password));

    if(err) TE(err.message);

    return member;

}
module.exports.authMember = authMember;


const deleteMember = async function(memberInfo){
    let member, err;

    if(!memberInfo.first_name) TE("A first name was not selected.");
    if(!memberInfo.last_name) TE("A last name was not selected.");

    // input sanitization - only enter what's required.
    const { first_name, last_name} = memberInfo;
    const oldMember = { first_name, last_name};

    [err, member] = await to(Member.remove(oldMember));
    if(err) TE(err.message);

    return member;
}
module.exports.deleteMember = deleteMember;