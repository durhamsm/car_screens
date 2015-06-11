/*****************************************************************************/
/* Notification: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.notification.events({
  "click .notification": function(event, tmpl) {
    //alert(tmpl.data.type);
    
    if (tmpl.data.type === "codeFound") {
      updateObject = {$set: {read: true}};
      Meteor.call("updateNotification", tmpl.data._id, updateObject);
      Router.go("/advertising_statistics");
      //window.location.href = "/advertising_statistics";
    } else {
      Errors.insert({message: "Don't know where to go?!"});
    }
    
  }
});

Template.notification.helpers({
  "timeAgo": function() {
    var dateDifference = new Date(new Date() - this.date);
    return (dateDifference.getUTCHours() + "h : " + dateDifference.getUTCMinutes() + "m : " +  dateDifference.getUTCSeconds() + "s");
  }
});

/*****************************************************************************/
/* Notification: Lifecycle Hooks */
/*****************************************************************************/
Template.notification.created = function () {
};

Template.notification.rendered = function () {
};

Template.notification.destroyed = function () {
};