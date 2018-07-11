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


const updateNotification = async function(notificationInfo, notificationId) {
    let notification, err;

    if(notificationInfo.title && !validator.isLength(notificationInfo.title, {min: 3, max: 50})) TE("A valid title was not entered.");
    if(notificationInfo.description && !validator.isLength(notificationInfo.description, {min: 3, max: 280})) TE("A valid description was not entered.");
    if(notificationInfo.url && !validator.isURL(notificationInfo.url)) TE("A valid url was not entered.");
    if(notificationInfo.tags && notificationInfo.tags.length === 0) TE("You must have at least one tag.");

    
      const updatedNotification = { ...notificationInfo };
  
      [err, notification] = await to(Notification.findOneAndUpdate({_id:notificationId}, updatedNotification, {new:true}));
      if(err) TE(err.message);

      return notification;
}
module.exports.updateNotification = updateNotification;