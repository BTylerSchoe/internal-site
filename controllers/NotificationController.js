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

// Update a notification identified by the notificationId in the request
const update = async function(req, res){
  // Validate Request
  if(!req.body) {
      return res.status(400).send({
          message: "notification body can not be empty"
      });
  }

  // Find notification and update it with the request body
  Notification.findByIdAndUpdate(req.params.notificationId, {
      title: req.body.title || "Untitled Notification",
      subject: req.body.subject,
      message: req.body.message,
      content: req.body.content
  }, {new: true})
  .then(notification => {
      if(!notification) {
          return res.status(404).send({
              message: "Notification not found with id " + req.params.notificationId
          });
      }
      return ReS(res,{notification:notification.toWeb()});
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Notification not found with id " + req.params.notificationId
          });                
      }
      return res.status(500).send({
          message: "Error updating Notification with id " + req.params.notificationId
      });
  });
};
module.exports.update = update;

// const update = async function(req, res){
//   let err, notification, data;
//   notification = req.notification;
//   data = req.body;
//   notification.set(data);

//   [err, notification] = await to(notification.save());
//   if(err){
//       return ReE(res, err);
//   }
//   return ReS(res, {notification:notification.toWeb()});
// }
// module.exports.update = update;

// remove notification //
const remove = async function(req, res){
  let body, err;
  body = req.body;

  [err, notification] = await to(notificationService.deleteNotification(body));
  if(err) return ReE(res, 'error occured trying to delete the notification');

  return ReS(res, {message:'Deleted notification-'}, 204);
}
module.exports.remove = remove;