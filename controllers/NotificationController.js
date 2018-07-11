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

  let err, notification;

  [err, notification] = await to(Notification.findOne({_id: req.params.notificationId}));

  if (err) return ReE(res, err.message, 422);
  if (notification) {
      return ReS(
          res,
          {
            message: "Successfully retrieved notification.",
            notification: notification.toWeb()
          },
          201
        );
      }
    };
  
  module.exports.get = get;

const getAll = async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  let err, notifications;
  let notification = req.notification;
  // let companies = await notification.Companies()
  
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
  let notification = req.notification;
  // let companies = await notification.Companies()

  return ReS(res, {
    notification: notification.toWeb(),
    companies: await notification.Companies(),
    jwt: notification.getJWT()
  });
};
module.exports.getAll = getAll;

// Update a notification identified by the notificationId in the request
const update = async function(req, res){
    res.setHeader("Content-Type", "application/json");
    const Id = req.params.notificationId;
    const body = req.body;
    let err, notification;
    

    [err, notification] = await to(notificationService.updateNotification(body, Id));


    if (err) return ReE(res, err, 422);
    return ReS(
      res,
      {
        message: "Successfully updated notification.",
        notification: notification.toWeb()
      },
      201
    );
  };
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