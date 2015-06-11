/*****************************************************************************/
/* AdvertisingMessages: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.advertisingMessages.events({
  
  "click .delete-message": function(event) {
    var messages = AdvertisingMessages.findOne().messages;
    
    var tr = $(event.target).closest('tr');
    var messageIndex = $(".message-display-tr").index(tr);
    messages.splice(messageIndex, 1);
    
    AdvertisingMessages.update({'_id': Meteor.userId()}, {$set: {"messages": messages}});
  }
});



/*****************************************************************************/
/* AdvertisingMessages: Lifecycle Hooks */
/*****************************************************************************/
Template.advertisingMessages.created = function () {
};

Template.advertisingMessages.rendered = function () {
};

Template.advertisingMessages.destroyed = function () {
};