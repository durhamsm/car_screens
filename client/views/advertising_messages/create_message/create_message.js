/*****************************************************************************/
/* CreateMessage: Event Handlers and Helpersss .js*/
/*****************************************************************************/
var dealTypes = ["2 for 1", "% Discount"];

Template.createMessage.events({
  "change #dealType": function(event) {
    
    if (event.target.value === "% Discount") {
      $("#discountDiv").show();
    } else {
      $("#discountDiv").hide();
    }
  },
  "submit #createMessageForm": function(event) {
    //alert("eh");
    event.preventDefault();
    
    var message = {
      text: $('#messageText').val(),
      dealType: $('#dealType').val(),
      percentDiscount: $("#discountInput").val()
    };
    
    Meteor.call("addNewAdvertisingMessage", Meteor.userId(), message);
  },
});

Template.createMessage.helpers({
  "getDealTypes": function() {return dealTypes;}
  
});

/*****************************************************************************/
/* CreateMessage: Lifecycle Hooks */
/*****************************************************************************/
Template.createMessage.created = function () {
};

Template.createMessage.rendered = function () {
};

Template.createMessage.destroyed = function () {
};