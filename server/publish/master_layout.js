
Meteor.publish("notifications", function(effected) {
  return Notifications.find({"effected": effected, read: false});
});