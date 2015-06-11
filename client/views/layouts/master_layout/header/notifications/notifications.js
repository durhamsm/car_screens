/*****************************************************************************/
/* Notifications: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.notifications.events({
  "click .notifications-unopened": function() {
    if (Session.get("notificationsOpen")) {
      Session.set("notificationsOpen", false);
    } else {
      Session.set("notificationsOpen", true);
    }
  },

});

Template.notifications.helpers({
  "getNotifications": function() {
    return Notifications.find();
  },
  "notificationsOpen": function() {
    return Session.get("notificationsOpen");
  }
});

/*****************************************************************************/
/* Notifications: Lifecycle Hooks */
/*****************************************************************************/
Template.notifications.created = function () {
};

Template.notifications.rendered = function () {
};

Template.notifications.destroyed = function () {
};