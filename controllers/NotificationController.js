const Notification = require('../models').Notification;
const notificationService = require("./../services/NotificationService");

const create = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const body = req.body;
  let err, notification;

  [err, notification] = await to(notificationService.createNotification(body));

  if (err) return ReE(res, err, 422);
  return ReS(
    res,
    {
      message: "Successfully added new notification.",
      notification: notification.toWeb()
    },
    201
  );
};
module.exports.create = create;


// Find a single notification with a notificationId
const get = async function(req, res){
  Notification.findById(req.params.notificationId)
  .then(notification => {
      if(!notification) {
          return ReS(res, {
              message: "notification not found with id " + req.params.notificationId
          });            
      }
      res.send(notification);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return ReS(res, {
              message: "notification not found with id " + req.params.notificationId
          });                
      }
      return ReS(res, {
          message: "Error retrieving notification with id " + req.params.notificationId
      });
  });
};
module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, notifications;
  let member = req.member;
  // let companies = await member.Companies()
  
  [err, notifications] = await to(Notification.find({}));

  return ReS(res, {
    message: "Successfully retrieved notifications.",
    notifications
  });
};
module.exports.getAll = getAll;

const getByTag = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  console.log("hello");
  let member = req.member;
  // let companies = await member.Companies()

  return ReS(res, {
    member: member.toWeb(),
    companies: await member.Companies(),
    jwt: member.getJWT()
  });
};
module.exports.getAll = getAll;

const update = async function(req, res){
  let err, notification, data;
  notification = req.notification;
  data = req.body;
  notification.set(data);

  [err, notification] = await to(notification.save());
  if(err){
      return ReE(res, err);
  }
  return ReS(res, {notification:notification.toWeb()});
}
module.exports.update = update;

// remove notification //
const remove = async function(req, res){
  let body, err;
  body = req.body;

  [err, notification] = await to(notificationService.deleteNotification(body));
  if(err) return ReE(res, 'error occured trying to delete the notification');

  return ReS(res, {message:'Deleted notification-'}, 204);
}
module.exports.remove = remove;