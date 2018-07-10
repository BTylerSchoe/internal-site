const Notification 			= require('./../models').Notification;
const validator     = require('validator');


const createNotification = async function(notificationInfo){
    let notification, err;

    if(!notificationInfo.title) TE("A title was not entered.");
    if(!notificationInfo.subject) TE("A subject was not entered.");
    if(!notificationInfo.message) TE("A valid message was not entered.");

    if(notificationInfo.title && !validator.isLength(notificationInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(notificationInfo.subject && !validator.isLength(notificationInfo.subject, {min: 3, max: 280})) TE("A valid subject was not entered.");


    // input sanitization - only enter what's required.
    const { title, subject, message } = notificationInfo;
    const newNotification = { title, subject, message};

    [err, notification] = await to(Notification.create(newNotification));
    if(err) TE(err.message);

    return notification;
}
module.exports.createNotification = createNotification;



const deleteNotification = async function(notificationInfo){
    let notification, err;

    if(!notificationInfo.title) TE("A title was not selected.");
    if(!notificationInfo.subject) TE("A subject was not selected.");

    // input sanitization - only enter what's required.
    const { title, subject} = notificationInfo;
    const oldNotification = { title, subject};

    [err, notification] = await to(Notification.remove(oldNotification));
    if(err) TE(err.message);

    return notification;
}
module.exports.deleteNotification = deleteNotification;